import Image from "next/image";

function MnemericLogo(props) {
    // In the NextJS environment, static file are served from /public
    // and may be referenced by code from the base URL ('/')
    return (
        <Image
            src="/timeline-icon.png"
            alt="mnemeric logo"
            width={props.width}
            height={props.height}
        />
    );
}

export default MnemericLogo;
