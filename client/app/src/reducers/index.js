
/* 
<GPAP Genomics Browser, a standalone react application that embeds an IGV.js browser for visualization of genomic alignments>
   Copyright (C) <2022>  <CRG-CNAG>

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published
   by the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.

For more information you can contact the authors at platform@rd-connect.eu  */


import { combineReducers } from "redux";
import { authorization,searchParameters } from "./authorization";


const allReducer = combineReducers({
    'authorization': authorization,
    'searchParameters': searchParameters
});


export default allReducer;