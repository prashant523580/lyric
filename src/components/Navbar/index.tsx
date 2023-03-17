import React from "react";
import { Menu as MuiMenu, FacebookRounded, Instagram, LocationOn, CloseRounded, Phone, MailOutlineOutlined, ShoppingBag } from "@mui/icons-material";
import  Link  from "next/link";
import styles from "../../styles/Navbar.module.scss";
import { Button } from "@mui/material";
// import Header from "./Header";
// import YoutubeComponent from "../youtube-component/Youtube";
// import { YouTube } from "@mui/icons-material";
import Header from "./Header";
import { useRouter } from "next/router";
interface StateTypes {
    isShow: boolean,
    scroll: number,
    showNav: boolean,
    showYoutube: boolean,
    cartConRef: any
}
const links = ["Home","Products", "About", "Contact"];
const navLink = [
    {
    label: "home",
    path:"/"
    },
    {
    label: "Songs",
    path:"/all"
    },
    {
    label: "Artists",
    path:"/artists"
    },
    {
    label: "Chords",
    path:"/chords"
    },
]

function ActiveLink({ children, href } : any) {
    const router = useRouter();
    const style = {
      marginRight: 10,
      color: router.asPath === href ? 'green' : 'black',
    }
  
    const handleClick = (e : any) => {
      e.preventDefault()
      router.push(href)
    }
  
    return (
      <a href={href} onClick={handleClick} style={style}>
        {children}
      </a>
    )
  }
export default class Navbar extends React.Component<{}, StateTypes>{
    private navRef: React.RefObject<HTMLDivElement>;
    // private youtubeRef: React.RefObject<HTMLDivElement> | undefined;
    private scrollIndicatorRef: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            scroll: 0,
            showNav: true,
            showYoutube: false,
            cartConRef: React.createRef()
        }

        this.navRef = React.createRef();
        this.scrollIndicatorRef = React.createRef();
    }
    componentDidMount(): void {
        window.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (!this.navRef.current || !this.navRef.current.contains(target)) {
                this.setState({ isShow: false })
            }
        })

        let previousScroll = window.pageYOffset;
        window.addEventListener("scroll", () => {
            this.setState({
                scroll: window.pageYOffset
            })
            let currentScroll = window.pageYOffset;
            let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (windowScroll / height) * 100;
            if (this.scrollIndicatorRef.current !== null) {

                this.scrollIndicatorRef.current.style.width = `${scrolled}%`
            }
            if (previousScroll > currentScroll) {
                this.setState({ showNav: true })
            } else {
                this.setState({ showNav: false })
            }
            previousScroll = currentScroll
        })
    }
    // toggleCart = () => {
    //     if (this.state.cartConRef.current.classList.contains("translate-x-full")) {
    //         this.state.cartConRef.current.classList.remove("translate-x-full");
    //         this.state.cartConRef.current.classList.add("translate-x-0");
    //     }
    //     else if (!this.state.cartConRef.current.classList.contains("translate-x-full")) {
    //         this.state.cartConRef.current.classList.remove("translate-x-0");
    //         this.state.cartConRef.current.classList.add("translate-x-full");


    //     }
    //     console.log(this.state.cartConRef.current.classList.contains("translate-x-full"))
    // }
    render(): React.ReactNode {
        return (
            <>
                <Header />
                <nav className={styles.nav} ref={this.navRef} style={{
                    // position: this.state.showNav ? "sticky" : "relative",
                    top: this.state.showNav ? "0" : "-135px",
                }}>

                    <div className={styles.logo}>
                        {/* <img src="/logo.png" alt="logo" width={200} height={150} /> */}
                        <Link href={"/"}>
                        Lyrico
                        </Link>
                    </div>
                    <div className={`${styles.nav_content} ${this.state.isShow === true ? styles.active : ""} `}
                        style={{
                            // background: this.state.scroll > 50 ? "var(--bg-color)" : "none",
                            // color: this.state.scroll > 50 ? "var(--bg-color)" : "black",
                        }}
                    >

                        {this.state.isShow === true &&
                            <div className={styles.nav_header}>
                                <div className={styles.logo}>
                                    {/* <img src="/logo.png" alt="logo" /BTHouse> */}
                                    Lyrico
                                </div>
                                <Button
                                    onClick={() => this.setState({ isShow: false })}
                                ><CloseRounded /></Button>
                            </div>

                        }
                        <div className={styles.links}>
                            {
                                navLink.map((link: any, ind: number) => {
                                    return (
                                        <ActiveLink key={ind} href={link.path}> {link.label} </ActiveLink>
                                        // <Link
                                        // onClick={() => this.setState({ isShow: false })}
                                        // href={`${link.path}`} key={ind}>{link.label}</Link>
                                    )
                                })
                            }

                        </div>
                        <div className={styles.contact_container}>
                            <h1>Contact Info</h1>
                            <div className={styles.contact}>
                                <LocationOn />
                                <p>Kathmandu, Bagmati</p>
                            </div>
                            <div className={styles.contact}>
                                <Phone />
                                <p>9878676788</p>
                            </div>
                            <div className={styles.contact}>
                                <MailOutlineOutlined />
                                <p>example@gmail.com</p>
                            </div>
                        </div>
                        {/* <div className={styles.social_content}>
                            <h1>Follow us on social network</h1>
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                margin: ".3em 0"
                            }}>

                                <a className={styles.facebook + " " + styles.icon}> <FacebookRounded /></a>
                                <a className={styles.instagram + " " + styles.icon}><Instagram /></a>
                            </div>
                        </div> */}
                    </div>
                    <div className={styles.actions} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>

                        {/* <Button
                            sx={{
                                color: "rgba(255,0,0,0.8)"
                            }}
                            onClick={this.toggleCart}
                        >
                            <ShoppingBag color="action" />
                        </Button> */}
                        <Button type="button" className={styles.menu} onClick={() => this.setState({ isShow: true })}><MuiMenu /></Button>
                    </div>
                    <div ref={this.scrollIndicatorRef} className={styles.scroll_indicator}></div>
                </nav>
                {/* <CartComponent
                    onClick={this.toggleCart}
                    cartConRef={this.state.cartConRef}
                /> */}
                {/* <YoutubeComponent
                     onClose={() => {this.setState({showYoutube : false})}}
                    showYoutube ={this.state.showYoutube}

                /> */}
            </>
        )
    }
}