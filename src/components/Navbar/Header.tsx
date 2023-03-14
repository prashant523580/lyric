import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from "@mui/icons-material";
import React from "react";
import styles from "../../styles/Navbar.module.scss";
export default class Header extends React.Component{
    render(): React.ReactNode {

        
        return(
            <div className={styles.header}
            style={{
                // height: this.state.scroll === 0 ? "75px" : "0",
                // top: this.state.scroll === 0 ? "-305px" : "0"
            }}
        >
            <div className={styles.logo}>
                {/* <img src="/logo.png" alt="logo" width={200} height={150} /> */}
                <h1>CN</h1>
            </div>
            <div className={styles.contact_container}>
                <div className={styles.contact}>
                    <LocationOnOutlined />
                    <div className="info">
                        <h1>Address</h1>
                        <p>Nepalgunj Banke</p>
                    </div>
                </div>
                <div className={styles.contact}>
                    <PhoneOutlined />
                    <div className="info">
                        <h1>Phone</h1>
                        <p>9845868544</p>
                    </div>
                </div>
                <div className={styles.contact}>
                    <EmailOutlined />
                    <div className="info">
                        <h1>Email</h1>
                        <p>example@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}