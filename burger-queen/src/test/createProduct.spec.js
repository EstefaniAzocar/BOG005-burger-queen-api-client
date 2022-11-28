import {render, screen} from "@testing-library/react"
import Login from "../view/login";
// import { AddProduct } from "../components/admin/adminProducts/createProduct"
// import axios from 'axios'
// jest.mock ("axios", ()=> {
//     return  {get: jest.fn(() => Promise.resolve({ data: {} })),
//         post: jest.fn(() => Promise.resolve({ data: {} })),
//         // create: () => axios,
//         defaults: {
//         adapter: {},
//         }}
//   });
// jest.mock("axios");
// const axios = {
//     get: jest.fn(() => Promise.resolve({ data: {} })),
//     post: jest.fn(() => Promise.resolve({ data: {} })),
//     create: () => axios,
//     defaults: {
//     adapter: {},
//     },
//     };

jest.mock("../petitions/userPetition");
jest.mock("../petitions/productPetition");

describe("pruebas del componente createProducts", () =>{

    it('create producto correctamente', () => {

        render(<Login/>)

        // const input = screen.getByLabelText('Username')

    })
})

