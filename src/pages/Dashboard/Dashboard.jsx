import { useState } from "react";
import RelatedSongs from "../../components/RelatedSongs/RelatedSongs";
import Statistics from "../../components/Statistics/Statistics";
import { songData } from "../../data";
import css from "./Dashboard.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Form from "../../components/AddSongForm/Form";

const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(21,21,21)",
    border: "none",
    outline: "none",
    borderRadius: 12,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Dashboard = () => {
    const [songId, setSongId] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [resultData, setResultData] = useState({
        difference: 0,
        percentage: 0,
        features: {
            energy: 0,
            speechiness: 0,
            acousticness: 0,
            danceability: 0,
        },
    });
    const [similarSongs, setSimilarSongs] = useState([
        {
            features: []
        },
        {
            features: []
        },
        {
            features: []
        },
    ]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getSongData = async (gender, age, weight, bpm, songName) => {
        try {
            setSongTitle(songName);
            const response = await fetch("http://192.168.1.11:8080/getScore", {
                method: "POST",
                body: JSON.stringify({
                    gender: gender,
                    age: age,
                    weight: weight,
                    bpm: bpm,
                    songName: songName,
                }),
                headers: { "Content-Type": "application/json" },
            });
            const json = await response.json();
            console.log(json);
            setResultData(json);
            setOpen(false)
        } catch (error) {
            console.log("error", error);
        }
    };
    const getRelatedSongs = async (gender, age, weight, bpm, songName) => {
        try {
            const response = await fetch("http://192.168.1.11:8080/getSimilarSongs", {
                method: "POST",
                body: JSON.stringify({
                    gender: gender,
                    age: age,
                    weight: weight,
                    bpm: bpm,
                    songName: songName,
                }),
                headers: { "Content-Type": "application/json" },
            });
            const json = await response.json();
            console.log(json);
            setSimilarSongs(json);
            setOpen(false)
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className={css.container}>
            {/* left side */}
            <div className={css.dashboard}>
                <div className={`${css.dashboardHead} theme-container`}>
                    <div className={css.head}>
                        <span>{songTitle}</span>
                    </div>
                    <div className={css.cards}>
                        <div className={css.card}>
                            <div className={css.cardHead}>
                                <span>{"Acousticness"}</span>
                            </div>

                            <div className={css.cardAmount}>
                                <span>{resultData["features"]["acousticness"]}</span>
                                <span> %</span>
                            </div>
                        </div>
                        <div className={css.card}>
                            <div className={css.cardHead}>
                                <span>{"Danceability"}</span>
                            </div>

                            <div className={css.cardAmount}>
                                <span>{resultData["features"]["danceability"]}</span>
                                <span> %</span>
                            </div>
                        </div>
                        <div className={css.card}>
                            <div className={css.cardHead}>
                                <span>{"Energy"}</span>
                            </div>

                            <div className={css.cardAmount}>
                                <span>{resultData["features"]["energy"]}</span>
                                <span> %</span>
                            </div>
                        </div>
                        <div className={css.card}>
                            <div className={css.cardHead}>
                                <span>{"Speechiness"}</span>
                            </div>

                            <div className={css.cardAmount}>
                                <span>{resultData["features"]["speechiness"]}</span>
                                <span> %</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Statistics similarSongs={similarSongs} />
            </div>
            {/* Right Side */}
            <RelatedSongs />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='child-modal-title'
                aria-describedby='child-modal-description'
            >
                <Box sx={{ ...style }}>
                    <Form getSongData={getSongData} getSimilarSongs={getRelatedSongs} />
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            <div
                className={css.floatingButton}
                onClick={handleOpen}
            >
                <AddIcon />
            </div>
        </div>
    );
};

export default Dashboard;
