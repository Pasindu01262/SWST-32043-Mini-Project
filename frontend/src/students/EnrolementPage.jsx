import PageHeader from '../components/header';
import './CourseRegistration.css';
function CourseRegistration (){
    return(
        <div className='container'>
            <PageHeader title='Course Registration' />
            <div className='button_row'>
                <button className='action_btn'>See enrolement</button>
                <button className='action_btn'>download PDF</button>
                <div className='serach_box'>
                    <input
                    type = "text"
                    placeholder = "Enter Course Code"
                    />
                </div>
                <button className='action_btn'>
                    Search course
                </button>
                <div className='courses_list'>
                    
                </div>
            </div>
            <div>
                hoooo
            </div>
        </div>
    );
}

export default CourseRegistration;