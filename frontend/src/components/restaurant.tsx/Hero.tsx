import { ArrowRightOutlined } from "@ant-design/icons/lib"
import { Layout, Row, Col } from "antd"

const Hero = () => {
    const heros = "relative w-full h-96 bg-[url('/assets/resto/resto.jpeg')] m-auto rounded-3xl bg-center bg-cover bg-no-repeat text-center flex items-center mb-6"
    const float = "absolute bg-white rounded-lg drop-shadow-lg py-5 px-8 w-2/3"
    const input = "outline-0 text-md py-2"
    return(
        <Layout className="bg-white py-10">
            <div className={heros}>
                <div className="m-auto p-2 bg-slate-800 w-full h-full rounded-3xl flex items-center justify-center opacity-40">
                    <div>
                        <h1 className="bg-clip-text text-2xl font-bold text-white">EXPERIENCE ENTICING DISHES AT EACH OF OUR RESTAURANTS</h1>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default Hero