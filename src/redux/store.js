
import {configureStore} from "@reduxjs/toolkit"
import projectReducer from "../features/projects/projectSlice"

export default configureStore({
reducer:{
projects:projectReducer
}
})
