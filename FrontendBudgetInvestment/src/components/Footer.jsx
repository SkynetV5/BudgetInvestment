import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <div id="footer">
            <div id="box">
                <Link><p>Pomoc</p></Link>
                <Link><p>Praca</p></Link>
                <Link><p>Kontakt</p></Link>
                <Link><p>Regulamin</p></Link>
                <Link><p>Informacje</p></Link>
            </div>
            <p>© 2024 BudgetInvestment By SkynetV5</p>
        </div>
    )
}