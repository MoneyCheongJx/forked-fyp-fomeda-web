export class HttpService {
    static async post(url: string, data: any, queryParams?: Record<string, string>) {
        try {
            if (queryParams) {
                const queryString = new URLSearchParams(queryParams).toString();
                url += `?${queryString}`;
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in POST request:', error);
            throw error;
        }
    }

    static async get(url: string, queryParams?: Record<string, string>) {
        try {
            if (queryParams) {
                const queryString = new URLSearchParams(queryParams).toString();
                url += `?${queryString}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in GET request:', error);
            throw error;
        }
    }

    static async put(url: string, data: any, queryParams?: Record<string, string>) {
        try {
            if (queryParams) {
                const queryString = new URLSearchParams(queryParams).toString();
                url += `?${queryString}`;
            }

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in PUT request:', error);
            throw error;
        }
    }

    static async delete(url: string, queryParams?: Record<string, string>) {
        try {
            if (queryParams) {
                const queryString = new URLSearchParams(queryParams).toString();
                url += `?${queryString}`;
            }
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.error('Error in DELETE request:', error);
            throw error;
        }
    }
}