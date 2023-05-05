import { useEffect, useState } from 'react';
import axios from 'axios';
import Presenter from './table';

export type Resident = {
  id: number;
  profilePhotoUrl: string;
  firstName: string;
  middleName: string;
  lastName: string;
  maritalStatus: string;
  homeAddress: string;
  gender: string;
  postalCode: string;
  guardian: string;
  age: number;
  mother: string;
  father: string;
  telephoneNumber: string;
  mobileNumber: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
};

export default function ResidentContainer() {
  const [residents, setResidents] = useState<Resident[]>([]);

  // feed residents to data prop of table

  useEffect(() => {
    axios
      .get(`${process.env.apiUrl}/resident`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => setResidents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Presenter tableData={residents} />
    </>
  );
}
