
import movieDetailCont from './components/movieDetailCont'
import movieContainer from './MovieContainer'



export const routes =[

    {path:"/",component : movieContainer},
    {path:'/movie-detail/:id', component : movieDetailCont}
]