import { User, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<User[]> => {
    return [
        {
            id: "728ed521",
            avatar: "/users/1.png",
            status: "active",
            fullName: "John Doe",
            initials: "JD",
            email: "johndoe@gmail.com",
        },
        {
            id: "728ed522",
            avatar: "/users/2.png",
            status: "active",
            fullName: "Jane Doe",
            initials: "JD",
            email: "janedoe@gmail.com",
        },
        {
            id: "728ed523",
            avatar: "/users/3.png",
            status: "inactive",
            fullName: "Mike Galloway",
            initials: "MG",
            email: "mikegalloway@gmail.com",
        },
        {
            id: "728ed524",
            avatar: "/users/4.png",
            status: "active",
            fullName: "Minerva Robinson",
            initials: "MR",
            email: "minerbarobinson@gmail.com",
        },
        {
            id: "728ed525",
            avatar: "/users/5.png",
            status: "inactive",
            fullName: "Mable Clayton",
            initials: "MC",
            email: "mableclayton@gmail.com",
        },
    ];
};

export default async function UsersPage() {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">All Users</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
