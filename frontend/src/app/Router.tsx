import {Routes, Route} from "react-router";
import { ConverterPage} from "@/pages/converter/ConverterPage.tsx";
import { RatesPage} from "@/pages/rates/Rates.tsx";
import { NotFoundPage} from "@/pages/notFound/NotFound.tsx";
import {AppLayout} from "@/layout/AppLayout/AppLayout.tsx";
import { AboutPage} from "@/pages/about/About.tsx";

export const AppRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<ConverterPage />} />
                <Route path="rates" element={<RatesPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}