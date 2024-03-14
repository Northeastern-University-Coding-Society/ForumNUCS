import {useRouter} from "next/router";
import {CircularProgress} from "@mui/material";
import {useEffect} from "react";
import NContainer from "@/components/layout/NContainer";

const LoginEventPage = () => {
    const { query: urlParams } = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined' || !window    ) {
            return;
        }
        if (urlParams) {
            const callbackUrl = urlParams.callbackUrl;
            delete urlParams[callbackUrl];
            const params = {
                ...urlParams,
            }
            window.location.assign(`${callbackUrl}${new URLSearchParams(params)}`)
        } else {
            window.location.assign('/account/login')
        }
    }, [urlParams]);

    return <NContainer>
        <CircularProgress></CircularProgress>
    </NContainer>;
}

export async function getServerSideProps(context) {
    const query = context?.query;
    console.log(query);
    if (query) {
        const callbackUrl = query.callbackUrl;
        delete query['callbackUrl'];
        const params = {
            ...query,
        }

        return {
            redirect: {
                destination: `${callbackUrl}?${new URLSearchParams(params)}`,
            }
        }
    } else {
        return {
            redirect: {
                destination: "/account/login",
            }
        }
    }
}

export default LoginEventPage;