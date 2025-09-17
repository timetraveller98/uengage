// "use client";
// import toast from "react-hot-toast";
// import { useMemo, useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
// import Box from "@mui/material/Box";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";
// import CachedIcon from "@mui/icons-material/Cached";
// import Status from "@/components/ui/Status";
// import { MdClose, MdDone } from "react-icons/md";
// import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
// import Heading from "@/components/ui/Heading";
// import * as React from "react";
// import { User } from "@prisma/client";
// import { updateUserStatus } from "@/actions/authentication/updateStatus";
// import { deleteUserById } from "@/actions/authentication/uodateUser";
// import DeleteModal from "@/components/ui/Model";

// interface UserProps {
//   users: User[];
// }

// const ShowUser: React.FC<UserProps> = ({ users }) => {
//   const router = useRouter();
//   const filterUser = users.filter((data) => data.role !== "SUPERADMIN");

// const handleToggleStatus = useCallback(async (id: string, isEnabled: boolean) => {
//   try {
//     const { success, message } = await updateUserStatus({
//       id,
//       isEnabled: !isEnabled,
//     });
//     if (success) {
//       toast.success(message || "User deleted successfully");
//       router.refresh();
//     } else {
//       toast.error(message || "Failed to delete user");
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     toast.error('Oops! Something went wrong');
//   }
// }, [router]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//    const [selectedId, setSelectedId] = useState<string | null>(null);

//    const openModal = (id: string) => {
//      setSelectedId(id);
//      setIsModalOpen(true);
//    };

//    const closeModal = () => {
//      setIsModalOpen(false);
//      setSelectedId(null);
//    };

//    const handleDelete = () => {
//      if (selectedId) {
//        deleteUserById(selectedId);
//      }
//      closeModal();
//    };

//   const columns = useMemo(
//     () => [
//       { field: "name", headerName: "Name", width: 120 },
//       { field: "email", headerName: "Email", width: 200 },
//       { field: "contact", headerName: "Contact", width: 110 },
//       { field: "membershipId", headerName: "Membership ID", width: 110 },
//       { field: "role", headerName: "Role", width: 120 },
//       {
//         field: "isEnabled",
//         headerName: "User Status",
//         width: 130,
//         renderCell: (params: GridRenderCellParams) => (
//           <Status
//             icon={params.row.isEnabled ? MdDone : MdClose}
//             bg={params.row.isEnabled ? "bg-success" : "bg-danger"}
//             color="text-white"
//             text={params.row.isEnabled ? "Active" : "Inactive"}
//           />
//         ),
//       },
//       {
//         field: "statuschange",
//         headerName: "Update Status",
//         width: 110,
//         renderCell: (params: GridRenderCellParams) => (
//           <CachedIcon
//             onClick={() => handleToggleStatus(params.row.id, params.row.isEnabled)}
//             color="success"
//             fontSize="large"
//             style={{ cursor: "pointer" }}
//             className="ms-2 mt-2 p-1"
//           />
//         ),
//       },
//       {
//         field: "update",
//         headerName: "Update",
//         width: 90,
//         renderCell: (params) => (
//           <EditIcon
//             onClick={() => router.push(`/admin/user/${params.id}`)}
//             color="success"
//             fontSize="large"
//             style={{ cursor: "pointer" }}
//             className="ms-2 mt-2 p-1"
//           />
//         ),
//       },
//       {
//         field: "delete",
//         headerName: "Delete",
//         width: 90,
//         renderCell: (params) => (
//           <DeleteForeverIcon
//             onClick={() => openModal(params.row.id)}
//             color="error"
//             fontSize="large"
//             style={{ cursor: "pointer" }}
//             className="ms-2 mt-2 p-1"
//           />
//         ),
//       },
//     ],
//     [router,handleToggleStatus]
//   );

//   return (
//     <div>
//       <div>
//           <Heading title="Manage User" center /> </div>

//           <Box sx={{ width: "100%", height: "300px" }}>
//             <DataGrid
//               disableColumnFilter
//               disableColumnSelector
//               disableDensitySelector
//               rows={filterUser}
//               columns={columns}
//               hideFooter
//               getRowId={(row) => row.id}
//               slots={{ toolbar: GridToolbar }}
//               getRowClassName={(params) =>
//                 params.row.isEnabled ? "super-app-theme--Active" : "super-app-theme--Inactive"
//               }
//               sx={{
//                 border: "none",
//                 "& .MuiDataGrid-row.Mui-selected": {
//                   border: "none",
//                   backgroundColor: "inherit",
//                 },
//                 "& .MuiDataGrid-row:hover": {
//                   backgroundColor: "inherit",
//                 },
//                 "& .MuiDataGrid-cell": {
//                   color: "#000",
//                 },
//                 "& .MuiDataGrid-cell:focus": {
//                   outline: "none",
//                 },
//                 "& .MuiDataGrid-row.Mui-selected:hover": {
//                   backgroundColor: "inherit",
//                 },
//                 "& .MuiDataGrid-cell:focus-within": {
//                   outline: "none",
//                 },
//               }}
//               slotProps={{
//                 toolbar: {
//                   showQuickFilter: true,
//                   quickFilterProps: { debounceMs: 500 },
//                 },
//               }}
//             />
//           </Box>
//        <DeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} />
//     </div>
//   );
// };

// export default ShowUser;
