'use client'
import moment from 'moment'
import React, { useState } from "react";
import styles from "./NewProfile.module.scss";
import CountriesJSON from './location.json';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"

function NewProfile(props) {
    let defaultProfile = {
        username: null,
        sex: 0,
        height: { feet: null, inches: null},
        weight: 0,
        location: {country: null, state: null},
        willRelocate: 1,
        wantsKids: 1,
        hasKids: 1,
        exercise: null, 
        drinking: null, 
        substances: null, 
        politic: null, 
        education: null, 
        bio: "",
        hasMoney: -1, 
        isTrad: -1, 
        isVirgin: -1
    }
    const [profile, setProfile] = useState(defaultProfile)

    const [states, setStates] = useState([]);
    const YES_AND_NO = [{value: 1, text:"Yes"}, {value: 0, text:"No"}]
    const YES_AND_NO_OPTIONAL = [{value: -1, text:"Rather not say"}, ...YES_AND_NO]
    const MALE_AND_FEMALE = [{value: 1, text:"Male"}, {value: 0, text:"Female"}]
    const AGES = []
    for (let i = 18; i<=99; i++) {
        AGES.push({value: i, text: i})
    }
    const REDDIT = [{label:"u/", value:"username"}]
    const HEIGHT = [
        {label:"feet;", value:"", right:true, type: "number", styles:styles.numeric, min: 0, max:7}, 
        {label:"inches;", value:"", right:true, type: "number", styles:styles.numeric, min: 0, max:11}, 
        {label:"lbs.", value:"", right:true, type: "number", styles:styles.numeric, min: 0, max:500}
    ]
    const COUNTRIES = []
    CountriesJSON.countries.forEach((element, index) => {
        COUNTRIES.push({value: index, text: element.country})
    });
    const EXCERCISE_FREQUENCY = [
        {value: "Absentee", text: "Absentee (Never)"},
        {value: "Infrequent", text: "Infrequent (0-1 days per week)"},
        {value: "Mild", text: "Mildly (2-3 days per week)"},
        {value: "Frequent", text: "Rarely (3-4 days per week)"},
        {value: "Heavy", text: "Heavy (5+ days per week)"}

    ]
    const DRINKING_FREQUENCY = [
        {value: "Never", text: "Never"},
        {value: "Infrequently", text: "Infrequently (A few times per year)"},
        {value: "Occasionally", text: "Occasionally (A few times per month)"},
        {value: "Socially", text: "Socially (Events and special occasions, a few times per month)"},
        {value: "Frequent", text: "Frequent (Weekly to daily drinking)"}
    ]
    const SMOKING_TYPES = [
        {value: "Never", text: "Never"},
        {value: "Cigars", text: "Cigars"},
        {value: "Vape", text: "Vape"},
        {value: "Cigarettes", text: "Cigarettes"},
        {value: "Edibles", text: "Edibles"},
        {value: "Other", text: "Other/Various"}
    ]
    const POLITICAL_STANCES = [
        {value: "Conservative", text: "Conservative"},
        {value: "Conservative-leaning", text: "Conservative-leaning Moderate"},
        {value: "Moderate", text: "Moderate"},
        {value: "Liberal-leaning", text: "Liberal-leaning Moderate"},
        {value: "Liberal", text: "Liberal"},
        {value: "Independent", text: "Independent"},
        {value: "Apolitical", text: "Apolitical"},
        {value: "Other", text: "Other"}
    ]
    const EDUCATION_LEVELS = [
        {value: "Doctorate", text: "Doctorate"},
        {value: "Masters", text: "Masters"},
        {value: "Bacholers", text: "Bacholers"},
        {value: "Masters", text: "Masters"},
        {value: "Associates", text: "Associates"},
        {value: "Diploma", text: "High School Diploma"},
        {value: "None", text: "None"}
    ]
    const onCountrySelect = (value) => {
        let country = CountriesJSON.countries[value];
        setProfile(profile => {profile.location.country = country; return profile})
        let result = [{value: "N/A", text: "Rather not say."}]
        country.states.forEach((element, index) => {
            result.push({value: `${index}`, text: element})
        });
        setStates(result)
    }    
    const onUsernameSelect = (username) => {
        setProfile(profile => {profile.username = username; return profile})
    }
    const onHeightFeetSelect = (feet) => {
        setProfile(profile => {profile.height.feet = feet; return profile})
    }
    const onHeightInchSelect = (inches) => {
        setProfile(profile => {profile.height.inches = inches; return profile})
    }

    // const onSexSelect = (sex) => {
    //     setProfile(profile => {profile.sex = sex; return profile})
    // }
    // const onSexSelect = (sex) => {
    //     setProfile(profile => {profile.sex = sex; return profile})
    // }

    // weight: 0,
    // location: {country: null, state: null},
    // willRelocate: 1,
    // wantsKids: 1,
    // hasKids: 1,
    // exercise: null, 
    // drinking: null, 
    // substances: null, 
    // politic: null, 
    // education: null, 
    // bio: "",
    // hasMoney: -1, 
    // isTrad: -1, 
    // isVirgin: -1

    return (
        <div className={styles.reviewhub}>
            <div className={styles.wrapper}>
            <h1 className={[styles.heading].join(" ")}>{props.community.name} Singles Database</h1>
                <h2 className={[styles.heading].join(" ")}>General</h2>
                <section className={[styles.section].join(" ")}>
                    <Label>This is a label</Label>
                    <Calendar></Calendar>
                </section>
                <h2 className={[styles.heading].join(" ")}>Location</h2>
                <section className={[styles.section].join(" ")}>

                </section>
                <h2 className={[styles.heading].join(" ")}>Family</h2>
                <section className={[styles.section].join(" ")}>

                </section>
                <h2 className={[styles.heading].join(" ")}>Substances & Lifestyle</h2>
                <section className={[styles.section].join(" ")}>

                </section>
                <h2 className={[styles.heading].join(" ")}>About You</h2>
                <section className={[styles.section].join(" ")}>

                </section>
                <h2 className={[styles.heading].join(" ")}>Sensitive Information (Optional)</h2>
                <section className={[styles.section].join(" ")}>
                                   </section>
                <div className={styles.submit}>
                    <button className={[styles.field, styles.btnAdd].join(" ")} onClick={() => { createProfile(profile); }}>SUBMIT</button>
                    <Button>Submit</Button>
                </div>
            </div>
        </div>
    );
} 

async function createProfile(profile) {
    console.log(profile)
}

export default NewProfile;