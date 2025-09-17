"use client";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { Role } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getUserById,
  updateUserById,
} from "@/actions/authentication/uodateUser";
import Heading from "@/components/ui/Heading";

interface Address {
  city: string;
  state: string;
  line1: string;
  line2?: string | null;
  postalCode: string;
}

interface UserProp {
  contact: string;
  role: Role;
  address?: Address | null;
}

interface RoleProps {
  roles?: Role[];
}

const ManageUser: React.FC<RoleProps> = ({ roles }) => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserProp | null>();
  const [formData, setFormData] = useState<{
    contact: string;
    role: Role;
    address: {
      city: string;
      state: string;
      line1: string;
      line2: string;
      postalCode: string;
    };
  }>({
    contact: "",
    role: "USER",
    address: {
      city: "",
      state: "",
      line1: "",
      line2: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (!params.id) return;
    const fetchUser = async () => {
      try {
        const data = await getUserById(params.id as string);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        contact: userData.contact || "",
        role: userData.role || "USER",
        address: {
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
          postalCode: userData.address?.postalCode || "",
        },
      });
    }
  }, [userData]);

  const [errors, setErrors] = useState({
    contact: false,
    role: false,
  });

  const validateContact = (contact: string): boolean =>
    /^\d{10}$/.test(contact);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: value.trim?.() === "" }));
  };

  const handleSubmit = async () => {
    const { contact, role } = formData;

    const newErrors = {
      contact: contact ? !validateContact(contact) : true,
      role: !role,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return toast.error("Please fill out all required fields correctly.");
    }

    setLoading(true);
    try {
      const response = await updateUserById(id, formData);
      if (response) {
        toast.success("Data updated successfully.");
        router.push("/admin/user");
      } else {
        toast.error("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <div>
        <Heading title="Update User" center />
      </div>
      <div>
        <TextField
          fullWidth
          value={formData.contact || ""}
          onChange={(e) => handleInputChange("contact", e.target.value)}
          label="Contact"
          variant="outlined"
          className="p-1 my-4"
          type="tel"
          required
          error={errors.contact}
          helperText={errors.contact ? "Invalid contact number" : ""}
          inputProps={{
            maxLength: 10,
          }}
        />
      </div>
      <div>
        <FormControl fullWidth className="m-1 my-4" error={errors.role}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={formData.role || ""}
            onChange={(e) => handleInputChange("role", e.target.value as Role)}
            label="Role"
            required
          >
            {roles?.map((roleOption) => (
              <MenuItem value={roleOption} key={roleOption}>
                {roleOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="contained"
          color="inherit"
          className="mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ManageUser;
