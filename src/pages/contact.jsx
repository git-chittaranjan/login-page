
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/footer';
import DashboardNavbar from '../components/dashboard-navbar';
import GetInTouch from '../components/email';

const Contact = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <DashboardNavbar />

            <div>
                <GetInTouch />
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
