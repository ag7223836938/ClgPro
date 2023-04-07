import React,{ Component } from 'react';
import { Card, CardBody, CardHeader ,CardImg,CardTitle,CardSubtitle} from 'reactstrap';
import Carousel from 'react-elastic-carousel';
import Loading from './LoadingComponent';

function Alumni({alum}) {
    return (
        <React.Fragment>
            <Card key={alum.id} className="cuscard">
                <CardHeader className="alum-header">
                    <CardImg top src="assets/user.png" className="alum-img mb-2"></CardImg>
                    <CardTitle>{alum.username}</CardTitle>
                    <CardSubtitle>{alum.specialization} Enthusiast</CardSubtitle>
                </CardHeader>
                <CardBody>
                    <p className="ml-0">{alum.description}
                    </p>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
const  breakPoints=[
    {width:500,itemsToShow:1},
    {width:768,itemsToShow:2},
    {width:1200,itemsToShow:3},
    {width:1500,itemsToShow:4}
]
class Placement extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const alumList=this.props.alums.map((alum)=>{
            return(
                <Alumni alum={alum}/>
            );
        
        });
        return(
            <React.Fragment>
                <div className="about">
                    <div className="container">
                        <div className="row about-text align-self-center">
                            <h3>About Exam</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore lorem. Lorem ipsum dolor sit amet, consect</p>
                        </div>
                    </div>
                </div>
                <div className="motto">
                    <div className="container">
                        <div className="row about-text align-self-center">
                            <h3>Best Channels</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore lorem. Lorem ipsum dolor sit amet, consect</p>
                        </div>
                    </div>
                </div>
                <div className="alum-section text-center">
                {
                    (this.props.alumsLoading)?
                    (<div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>)
                    :
                    
                    (this.props.alumsErrmess)?
                    (<div className="container">
                        <div className="row">
                            <h4>{this.props.alumsErrmess}</h4>
                        </div>
                    </div>)
                    :
                    <div>
                    <h3 className="pt-3">Our Alums who cracked it!!</h3>
                    <Carousel breakPoints={breakPoints}>
                        {alumList}
                    </Carousel>
                    </div>
                    }
                   
                </div>
            </React.Fragment>
        );
    }
}

export default Placement;