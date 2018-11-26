import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:9999/api',
})


export async function authenticate(code){
    try{
      const result =  await request.get('/authenticate/' + code)
        console.log(result)
    } catch(e) {
        console.error(e)
    }
}
