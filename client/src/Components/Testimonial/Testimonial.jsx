import './Testimonial.css';
import Review1 from '../Testimonial/Review1';
const Testimonial = () => {
  return (
    <>
        <section className="testi">
            <h1>What Our Customer Says About us</h1>
            <div className="testimonial">
    
                <div className="wrapper1" data-aos="fade-left">
                    <Review1 
                    content = "What's the first place you go to when trying to find a product/service? That's easy, it's Google. So, it's also natural that Google is the best site for online reviews. "
                    image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    name = "John Smith"
                    email = "john@vectorstock.com"
                    />
                    <Review1 
                    content = "Veryyy beautiful.... Loved the pots with very fresh plants. Even packing was excellent. Will buy them again with different types of plants. "
                    image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTuYTPz8et6f08brD5MZAtt1ADZxgiKa3-0HwDFzyLYg&s"
                    name = "Amyra Kewal"
                    email = "kewal@gmail.com"
                    />
                    <Review1 
                    content = "Nice plant. team is also always ready to help. Go for this if you are interested in buying a online plant. you wont be disappointed."
                    image = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    name = "Ranjit Singh"
                    email = "ranjit@icloud.com"
                    />
                </div>

                <div className="wrapper2" data-aos="fade-left">

                    <div className="review2">
                            <div className="rev_content1">
                                <p>
                                Delivery- 5/5<br />
                                Overall packing - 5/5<br />
                                Plants Packing- 5/5<br />
                                Pot - 5/5<br />
                                Absolutely happy with the product.<br />
                                If anyone planning to buy this - Don't even think- Just buy it and you will never regret for sure.
                                
                                </p>
                            </div>
                            <div className="rev_user1">
                            <img src="https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg" alt="" />
                            <div className="rev_user_content1">
                                <h3>Anushka Sharma</h3>
                                <span>anushka@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="wrapper4">

                        <div className="wrapper5">
                            <Review1 
                            content = "Before purchasing, take 5 mins and please read the complaints against this company in www.consumercomplaints.in. You will be amazed. Good Luck. "
                            image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                            name = "Om Shete"
                            email = "om@gmail.com"
                            />
                            <Review1 
                            content = " No words for these beauties... Was skeptical if they could survive the transit or 15-20 days post transit issues, hence ordered 1. "
                            image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTuYTPz8et6f08brD5MZAtt1ADZxgiKa3-0HwDFzyLYg&s"
                            name = "Hamza Sayed"
                            email = "hamzagm@gmail.com"
                            />
                        </div>
                        <div className="wrapper5">
                            <Review1 
                            content = "All plants were in very good conditions.size of pot is similar to coffee mug but good enough foe secculent plants...."
                            image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                            name = "Mohib Sayed"
                            email = "mohib@gmail.com"
                            />
                            <Review1 
                            content = "I really like ur live plants and wish to order more in future "
                            image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTuYTPz8et6f08brD5MZAtt1ADZxgiKa3-0HwDFzyLYg&s"
                            name = "Parth Puranik"
                            email = "parthos@gmail.com"
                            />
                        </div>

                    </div>
                </div>

                <div className="wrapper3" data-aos="fade-left">
                    <Review1 
                    content = "Came with good package. Nice thick stem and with wet coco peat but nothing came out of the pack. Got a healthy plant "
                    image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTuYTPz8et6f08brD5MZAtt1ADZxgiKa3-0HwDFzyLYg&s"
                    name = "SaiKaushik"
                    email = "sai@gmail.com"
                    />
                    <Review1 
                    content = "Love the packaging equally if not more than the plants. Plants are growing well. The sanseveria pink got dried a bit. But its well jow. The money plant is growing beautifully."
                    image = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    name = "Jagjeet Singh"
                    email = "jaggu@icloud.com"
                    />
                    <Review1 
                    content = "I am enjoying gardening but people are telling me that it is bit expensive but I am happy as all plants are thriving well."
                    image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    name = "Sagar Singh"
                    email = "sagar0@gmail.com"
                    />    
                </div>

            </div>
        </section> 
    </>
  )
}

export default Testimonial