
function Footer() {
    return (
        <div className="Footer w-full border-t py-10 flex flex-col items-center">
            <p className="flex justify-center items-baseline h-fit gap-1 text-sm">
                Copyright by
                <div className="flex text-lg font-black gap-[2px]">
                    <span className="text-green-600 dark:text-green-500">
                        Hi
                    </span>
                    <span className="">
                        Commit
                    </span>
                </div>
                <span className="font-medium">2024</span>
            </p>
            <span className="text-sm">A project of the <strong>ITHub Club</strong>, Tra Vinh University</span>
            <span className="text-sm">Dev by <strong className="font-semibold text-green-600 dark:text-green-500">kakanvk</strong></span>
        </div>
    );
};

export default Footer;