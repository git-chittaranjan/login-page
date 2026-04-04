
import Spinner from "./Spinner";

const PageLoader = ({ label = "Loading..." }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
        <Spinner size="lg" variant="white" label={label} />
        <p className="mt-4 text-white text-sm">{label}</p>
    </div>
);

export default PageLoader;