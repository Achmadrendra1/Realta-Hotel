import Layouts from "@/layouts/layout"
import { useRouter } from "next/router"

const Hotels = () => {
    const router = useRouter()
    return(
        <Layouts>
            {router.asPath}
        </Layouts>
    )
}

export default Hotels