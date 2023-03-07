import Denmark from 'src/Setup/Assets/Images/denmark.jpeg';
import OurSystem from 'src/Setup/Assets/Images/block2.jpeg';
import Flag from 'src/Setup/Assets/Images/facts/flag.jpeg';
import Corruption from 'src/Setup/Assets/Images/facts/corruption.jpeg';
import Surfing from 'src/Setup/Assets/Images/facts/surfing.jpeg';
import Bakkery from 'src/Setup/Assets/Images/facts/bakkery.jpeg';
import Island from 'src/Setup/Assets/Images/facts/island.jpeg';
import Cycle from 'src/Setup/Assets/Images/facts/cycle.jpeg';
import Hameed from 'src/Setup/Assets/Images/Hameed 1.jpg';
import Farrukh from 'src/Setup/Assets/Images/farrukh.jpeg';
import Kaleem from 'src/Setup/Assets/Images/kaleem 1.jpg';
import Person from 'src/Setup/Assets/Images/person.jpeg';

export const IntroData = (props) => {
    
    const { examDate, registrationDate, fee } = props ?? [{'examDate': ''}, {'registrationDate': ''}, {'fee': ''}];

    const aboutData = [
        {
            img: Denmark,
            title: 'Medborgerskabsprøven',
            shortDescription: 'In order to be granted a permanent residence permit you must meet at least 2 of the 4\
                            supplementary requirements in addition to the basic requirements. The Test is one of the 4 supplementary requirements.',
            longDescription: `
        
        <div>
            <h2>About Exam</h2>
            <p>
                In order to be granted a permanent residence permit you must meet at least 2 of the 4
                supplementary requirements in addition to the basic requirements. The Test is one of the 4 supplementary requirements. By passing Medborgerskabsprøven
                you can meet one of the requirements for parmenent residence permit in Denmark. Medborgerskabsprøven shows one's degree of integration
                by testing one's knowledge about Danish system, society, culture as well as history.
            </p>              

            <h2>Exam Timing And Venue</h2>
            <p>
                The test is held twice a year, in summer and in winter. The next test will be held by <u>${examDate}</u>, at <u>11:00am</u>. The test is held by a number of language schools throughout the country. If you get sick, you must wait and sign up for the next test. You will have to pay a new fee.
            </p>
            <h2>Registration</h2>
            <p>
                The deadline of registration for the test on ${examDate} is no later than <u>${registrationDate}</u>. Registration fee for the test is <u>${fee}</u> kr.
            </p>
            <h2> The exam day </h2>
            <p>It is important that you meet up in good time before the exam begins. The examination room opens 10 minutes before the start of the exam. At the beginning of the exam, the supervisors distribute a task set to each exam participant. You can only write your answer on the answer sheet that is included in the exam. You must write your name, cpr number and exam number on the front of the answer sheet.

                If you think you have answered a question incorrectly, you can correct your answer. Any correction must be clearly marked.
            </p>
            <p>Do not bring dictionaries or other aids to the test. And do not bring a mobile phone, music player or similar technical equipment as well.</p>
            <p>You must not be in contact with the other candidates during the exam</p>
            <p>You need to raise your hand if you want to talk with a supervisor</p>
            <p>You must not leave your room without the permission of a supervisor, even if you just go to the toilet</p>
            <p>You must not leave your seat before the test is complete</p>
            <p>The supervisor tells when the 30-minutes have passed</p>
            <p>You must not remove the questions sheet from the examination room</p>
            <p>You must not leave your seat until the supervisor has obtained your answer sheet and certified the receipt</p>
            <p>Violation of these rules may result in expulsion</p>

            <h2>People with special needs</h2>
            <p>As a rule, do not bring a helper or aids, eg dictionaries, to the citizenship test.</p>
            <p>However, permission may be granted for the use of aids to equate persons with disabilities with other participants as far as possible. However, the permit must not impair the professional level of the test. For example, if you are deaf, blind or dyslexic, and your disability makes it difficult for you to participate in the citizenship test on a regular basis, you can apply for a waiver.</p>
            <p>For example, special practical measures and use of technical aids, presence of a helper and extended exam time may be permitted.</p>
            <p>If you think you need such special aids, you can contact the examiner where you wish to take the exam. The authorities will then be able to guide you about the dispensing options.</p>
            <p>You must be aware that you must be able to document non-obvious disabilities with the opinion of a doctor, psychologist, psychologist or other expert, and the opinion may not be more than 2 years old (counted from the date when the application must be held by the examiner ). The statement must explain your difficulties in conducting the test.</p>
            <p>Application for permission to use aids, etc. Must reach the test holder no later than 4 weeks before the exam.</p>

            <h2>Result of the exam</h2>
            <p>It can take up to 3-4 weeks before the result of the exam is available. The authorities will then issue a certificate to you if you have passed the exam.</p>

            <h2>Appeals</h2>
            <p>You have the opportunity to complain about conditions during the exam. Such a complaint must be submitted to the International Recruitment and Integration Board (SIRI) no later than 4 weeks after the exam has taken place.</p>
            <p>You also have the opportunity to complain about the assessment of your response. Such a complaint must be submitted to the International Recruitment and Integration Board (SIRI) no later than 4 weeks after you have obtained the result of the exam.</p>
            <p>A complaint must be submitted individually and in written form and substantiate the objections.</p>

            <h2>Preparation for the Exam</h2>
            <p>
                We recommend you to first go through the official material prepared by ministry <a href="#">(Reading Material)</a>. After going through that file, we would like to motivate you to review all our tests and prepare you 100% for the final exam. We assure you that you will be happy to use our course.
            </p>
        </div>

        `
        },
        {
            img: OurSystem,
            title: 'Our System',
            shortDescription: 'We have arranged 500 relevant questions from official material given by the ministry of foreigners and integration.\
                            The questions have been distributed into 20 different tests. Each test consists of 25 questions...',
            longDescription: `

        <div>
            <h2>About Our System</h2>
            <p>
                We have arranged 500 relevant questions from official material given by the ministry of foreigners and integration.
            </p>
            <p>
                The questions have been distributed into 20 different tests. Each test consists of 25 questions,
                and the test environment has a count down timer, which has been set to 30 minutes,
                as in the final exam you have 30 minutes to answer the questions.
            </p>
            <p>
                The aim is to train you to finish the test within given time span.
                The tests have been organized exactly like ministry’s exam,
                so at the exam day you will not be nervous or curious about exam pattern.
            </p>
            <p>
                After going through all our tests you have 99.999% guarantee to pass the ministry’s exam.
                We are working closely with the community to improve the content and material.
            </p>

        </div>
        
        `
        }

    ];

    const TipsData = {
        data:
            `<div>
            <h2>Useful tips to boost your exam performance</h2>
            <ul>
                <li>
                    Do not tell many people that you are going for exam because you put extra pressure on yourself to pass the exam.
                </li>
                <li>
                    If you are nervous about exam then try to pass all our tests with no or minimum mistakes, so it will increase your confidence level and help you to control your nervs before and during exam.
                </li>
                <li>
                    Have good preparation and do not leave a question unanswered. If you are in doubt about a question, do not focus only that question. By doing so you may choose wrong answer for one or more of next questions because of shortage of time.
                </li>
                <li>
                    Wake up early at exam day so that you do not need to rush through having breakfast and getting ready.
                </li>
                <li>
                    Before going for exam check the venue and time of the exam to make sure that you have not confused the day/time/venue.
                </li>
                <li>
                    Make sure you get everything ready well in advance of the exam, like your valid photo identity card, map to the exam venue, your bus card or petrol in your car etc.
                </li>
                <li>
                    Use every minute of the exam and if you have time left, review your answers before handing back the paper.
                </li>
                <li>
                    Eat and drink as usual (not alkohol).
                </li>
                <li>
                    Go to the toilet before the exam starts.
                </li>
            </ul>
        </div>`
    
    }

    const BlocksData = [
        {
            to: '/about/Medborgerskabsprøven',
            heading: 'About Exam',
            icon: 'DescriptionIcon',
            description: `Next Exam will be held by ${examDate}`
        },
        {
            to: '/packages',
            heading: 'Packages',
            icon: 'ShoppingCartIcon',
            description: 'Choose one of the packages and get access to tests database'
        },
        {
            to: '/tips',
            heading: 'Tips',
            icon: 'ListAltIcon',
            description: 'Follow the given useful tips to boost your exam performance.'
        }
    ];

    return{aboutData, TipsData, BlocksData}

}

export const FactsData = [
    {
        title: 'Least Corrupt',
        description: 'Denmark is the least corrupt country in the world ',
        pic: Corruption
    },
    {
        title: 'The world\'s oldest flag',
        description: 'The Danish flag called "Danneborg" is the world\'s oldest independent state\'s flag ',
        pic: Flag
    },
    {
        title: 'The Danish pastry',
        description: 'The Danish pastry is one of the best pastries in the world ',
        pic: Bakkery
    },
    {
        title: 'The country of Islands',
        description: 'Denmark has more than 400 islands',
        pic: Island
    },
    {
        title: 'Surfing',
        description: 'Denmark has Scandinavia\'s best places for surfing in Nothern Jutland ',
        pic: Surfing
    },
    {
        title: 'Cycling',
        description: 'In Denmark 9 out of 10 Danes own a bike, and more then 50% people in copenhagen go to work on bycycle ',
        pic: Cycle
    },

];

export const TestimonialData = [
    {
        pic: Farrukh,
        name: 'Farrukh Razaq',
        comments: `It was really informative and useful. I learned a lot of relevant information about Denmark. I went to the test with a feeling that I would definitely pass it.`
    },
    {
        pic: Hameed,
        name: 'Hozan Agiri',
        comments: 'I must say, this is an incredible platform to get prepared for the active citizenship test. Thanks to medborgerskabsprove.dk and I highly recommend it.'
    },

    {
        pic: Person,
        name: 'Albert Mandjou',
        comments: 'I really appreciate the effort to retrieve useful information from given ministry\'s material. I got what I needed to have to pass the exam. Highly recommended :)'
    },
    {
        pic: Kaleem,
        name: 'Kaleem Ullah',
        comments: 'This platform is the perfect way to know many of the relevant things. Of course it takes time, but is a great help to pass official exam. Thanks to medborgerskabsprove.dk'
    },

];

export const MenuPages = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Packages',
        url: '/packages'
    },
    {
        name: 'Tests',
        url: '/tests'
    },
    {
        name: 'PrevExams',
        url: '/prevexams'
    },
    {
        name: 'About',
        url: '/about/Medborgerskabsprøven'
    },
    {
        name: 'Tips',
        url: '/tips'
    }

];