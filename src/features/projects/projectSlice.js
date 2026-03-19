
import {createSlice} from "@reduxjs/toolkit"
import {projects} from "../../static-data/projects"

const slice=createSlice({
name:"projects",
initialState:{list:projects},
reducers:{}
})

export default slice.reducer
