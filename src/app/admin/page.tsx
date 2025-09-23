import AppAreaChart from "@/components/layout/admin/AppAreaChart";
import AppBarChart from "@/components/layout/admin/AppBarChart";
import AppPieChart from "@/components/layout/admin/AppPieChart";
import CardList from "@/components/layout/admin/CardList";
import TodoList from "@/components/layout/admin/TodoList";

const Homepage = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            <div className="bg-card rounded-lg border-1 p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2 dark:border-0!">
                <AppBarChart />
            </div>
            <div className="bg-card rounded-lg border-1 p-4 dark:border-0!">
                <CardList title="Latest Transactions" />
            </div>
            <div className="bg-card rounded-lg border-1 p-4 dark:border-0!">
                <AppPieChart />
            </div>
            <div className="bg-card rounded-lg border-1 p-4 dark:border-0!">
                <TodoList />
            </div>
            <div className="bg-card rounded-lg border-1 p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2 dark:border-0!">
                <AppAreaChart />
            </div>
            <div className="bg-card rounded-lg border-1 p-4 dark:border-0!">
                <CardList title="Popular Products" />
            </div>
        </div>
    );
};

export default Homepage;
