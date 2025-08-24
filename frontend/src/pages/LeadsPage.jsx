import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  useLeads,
  useCreateLead,
  useDeleteLead,
  useUpdateLead,
} from "../hooks/useLeads";

import LeadFormModal from "../components/LeadFormModal";
const LeadsPage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, 
    pageSize: 20,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const { data, isLoading, error } = useLeads( paginationModel.page + 1,
    paginationModel.pageSize, {});
  const createLeadMutation = useCreateLead();
  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();


  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      deleteLeadMutation.mutate(id);
    }
  };

  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      updateLeadMutation.mutate({ ...formData, id: selectedLead._id });
    } else {
      createLeadMutation.mutate(formData);
    }
    handleCloseModal();
  };

  const columns = [
    { field: "first_name", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "last_name", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 200 },
    { field: "company", headerName: "Company", flex: 2, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
    {field: "score",headerName: "Score",type: "number",flex: 1,minWidth: 80,},
    {field: "lead_value",headerName: "Lead Value",type: "number",flex: 1,minWidth: 80,},
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleOpenEditModal(params.row)}
            className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const rows =
    data?.data?.map((lead) => ({
      ...lead,
      id: lead._id,
    })) || [];

  if (error)
    return <div className="p-4 text-red-500">Error fetching leads.</div>;

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads Dashboard</h1>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mt-2 sm:mt-0"
        >
          Add New Lead
        </button>
      </div>
      <div className="flex-1 min-h-[400px]">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading || createLeadMutation.isLoading || updateLeadMutation.isLoading || deleteLeadMutation.isLoading}
          paginationMode="server"
          rowCount={data?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[20, 50, 100]}
        />
      </div>
      <LeadFormModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        lead={selectedLead}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default LeadsPage;
