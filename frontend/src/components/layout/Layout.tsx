import { useLayoutStore } from '../../store/layoutStore';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DashboardHome from '../../pages/DashboardHome';
import SettingsPage from '../../pages/SettingsPage';
import InquiryPage from '../../pages/InquiryPage';

const Layout = () => {
    const { currentMenu } = useLayoutStore();

    const renderContent = () => {
        switch (currentMenu) {
            case 'home':
                return <DashboardHome />;
            case 'settings':
                return <SettingsPage />;
            case 'inquiry':
                return <InquiryPage />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{renderContent()}</main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
