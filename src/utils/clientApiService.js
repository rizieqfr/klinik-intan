import request from "./requestClient";


class ClientRequest {

    static urlAPI() {
        return process.env.NEXT_PUBLIC_BACKEND_API_URL
    }

    // Begin :: Auth
    static Login(username, password) {
        let path = 'login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                username,
                password,
            },
        })
    }

    static LoginPasien(data) {
        let path = 'patient/login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data
        })
    }
    static Register(data) {
        let path = 'register';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data
        })
    }

    static Register(data) {
        let path = 'register';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
        })
    }

    static CountDashboard(token) {
        let path = `amount-dashboard`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    // Role
    static GetRole(token) {
        let path = `role`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static Fetch(token) {
        let path = `fetch`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // User Management
    static GetUserManagement(token, page, search, sorting) {
        let path = `user-management?page=${page}&search=${search}&sorting=${sorting}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetUserManagementById(token, id) {
        let path = `user-management/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static CreateUserManagement(token, data) {
        let path = `user-management`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static UpdateUserManagement(token, data, id) {
        let path = `user-management/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    static DeleteUserManagement(token, id) {
        let path = `user-management/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    //Pasien
    static GetPasien(token) {
        let path = `patient`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetPasienById(token, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreatePasien(token, data) {
        let path = `register-patient`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static CreatePasienNoToken(data) {
        let path = `register-patient`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
        })
    }

    static UpdatePasien(token, data, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeletePasien(token, id) {
        let path = `patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Rekam Medis
    static GetRekamMedisByPatient(token, id) {
        let path = `rekam-medis/patient/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetRekamMedis(token) {
        let path = `medical-record`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetRekamMedisById(token, id) {
        let path = `medical-record/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateRekamMedis(token, data) {
        let path = `medical-record`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateRekamMedis(token, data, id) {
        let path = `medical-record/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeleteRekamMedis(token, id) {
        let path = `rekam-medis/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Jadwal Dokter
    static GetJadwalDokterAll(page, keyword, sorting, date) {
        let path = `jadwal-dokter?page=${page}&search=${keyword}&sorting=${sorting}&date=${date}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
        })
    }
    
    static GetJadwalDokterAdmin(token, keyword, page, sorting) {
        let path = `jadwal-dokter?page=${page}&search=${keyword}&sorting=${sorting}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static GetJadwalDokterById(token, id) {
        let path = `jadwal-dokter/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateJadwalDokter(token, data) {
        let path = `jadwal-dokter`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static UpdateJadwalDokter(token, data, id) {
        let path = `jadwal-dokter/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    
    static DeleteJadwalDokter(token, id) {
        let path = `jadwal-dokter/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Payment

    static GetPayment(token, keyword) {
        let path = `transaction/${keyword}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetPaymentById(token, id) {
        let path = `transaction?invoiceId=${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdatePayment(token, data, id) {
        let path = `invoice/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static CreateLayanan(token, data) {
        let path = `medicine`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static GetLayanan(token, keyword) {
        let path = `medicine`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetLayananById(token, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdateLayanan(token, data, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static DeleteLayanan(token, id) {
        let path = `medicine/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static DeleteReservasi(token, id) {
        let path = `reservation/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static CreateReservasi(token, data) {
        let path = `reservation`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static GetReservasi(token, keyword) {
        let path = `type-reservation/${keyword}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetAllReservasi(token) {
        let path = `reservation`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static GetReservasiById(token, id) {
        let path = `reservation/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default ClientRequest;
