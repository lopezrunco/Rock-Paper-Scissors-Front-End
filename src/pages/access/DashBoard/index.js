import PageTitle from "../../../components/PageTitle"

function DashBoard() {
    return (
        <main className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <PageTitle title="Dashboard" subtitle="View your profile" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashBoard