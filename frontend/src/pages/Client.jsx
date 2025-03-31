import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "../features/client/clientApi";
import DataTable from "../components/data-table";
import { MoreHorizontal, InfoIcon, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DataTableColumnHeader from "@/components/data-table-column-header";
import LoadingScreen from "@/components/loading-screen";
import { toast } from "sonner";
import ConfirmDialog from "@/components/confirm-dialog";
import FormSheet from "@/components/form-sheet";
import TooltipPop from "@/components/tooltip-pop";

const Client = () => {
  const navigate = useNavigate();
  const {
    data: clients,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientsQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [createClient] = useCreateClientMutation();

  const memorizedClients = useMemo(() => clients?.data || [], [clients]);

  const handleCopyID = useCallback((id) => {
    navigator.clipboard.writeText(id);
  }, []);

  const handleDelete = useCallback(
    async (client) => {
      try {
        const response = await deleteClient(client._id).unwrap(); // Ensure we get API response
        toast.success(response.message || "Client deleted successfully"); // Show API message
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete client"); // Show API error message
      }
    },
    [deleteClient, refetch]
  );

  const handleUpdate = useCallback(
    async (client) => {
      try {
        let updatedClient = {
          id: client._id,
          name: client.name,
          address: client.address,
        };

        const response = await updateClient(updatedClient).unwrap(); // Ensure we get API response
        toast.success(response.message || "Client updated successfully"); // Show API message
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update client"); // Show API error message
      }
    },
    [updateClient, refetch]
  );

  const handleCreate = useCallback(
    async (newClient) => {
      try {
        const response = await createClient(newClient).unwrap(); // Ensure we get API response
        toast.success(response.message || "Client created successfully"); // Show API message
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to create client"); // Show API error message
      }
    },
    [createClient, refetch]
  );

  const handleRowClick = useCallback(
    (client) => {
      navigate(`/client/${client._id}/products`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="pl-1">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => (
          <div className="pl-1">{row.getValue("address")}</div>
        ),
      },
      {
        id: "Actions",
        cell: ({ row }) => {
          const client = row.original;

          return (
            <div className="flex justify-end -ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleCopyID(client._id)}>
                    Copy Client ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground">
                    <FormSheet
                      title="Edit Client"
                      description="Update client details here."
                      fields={[
                        { label: "ID", name: "_id", type: "hidden" },
                        {
                          label: "Name",
                          name: "name",
                          type: "text",
                          required: true,
                          autoComplete: "given-name",
                        },
                        {
                          label: "Address",
                          name: "address",
                          type: "textarea",
                          required: true,
                          autoComplete: "address-line1",
                        },
                      ]}
                      data={client}
                      onSubmit={handleUpdate}
                      trigger="Edit Client"
                    />
                  </div>
                  <ConfirmDialog
                    renderTrigger={
                      <DropdownMenuItem
                        className="text-red-600"
                        onSelect={(e) => e.preventDefault()}
                      >
                        Delete Client
                      </DropdownMenuItem>
                    }
                    title="Delete Client"
                    description={
                      <>
                        Are you sure you want to delete{" "}
                        <strong>{client.name}</strong>?
                      </>
                    }
                    confirmText="Delete"
                    confirmTextClassName="bg-red-600 text-white hover:bg-red-600/50"
                    cancelText="Cancel"
                    onConfirm={() => handleDelete(client)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ];
  }, [handleDelete, handleCopyID]);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error("Client Fetch Error", {
      description: error?.data?.message,
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto h-full px-4">
      <DataTable
        columns={columns}
        data={memorizedClients}
        onRowClick={handleRowClick}
        additionalActions={
          <FormSheet
            title="Add Client"
            description="Add new client details here."
            fields={[
              {
                label: "Name",
                name: "name",
                type: "text",
                autoComplete: "given-name",
                required: true,
              },
              {
                label: "Address",
                name: "address",
                type: "textarea",
                autoComplete: "address-line1",
                required: true,
              },
            ]}
            onSubmit={handleCreate}
            trigger={
              <TooltipPop
                content="Add Client"
                trigger={
                  <Button variant="outline" className="ml-3">
                    <Plus />
                  </Button>
                }
              />
            }
          />
        }
      />
    </div>
  );
};

export default Client;
