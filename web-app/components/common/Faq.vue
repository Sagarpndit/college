<script setup>
const faqList = [
    {
        header: 'What is the “30 min free trial” offer?',
        content: 'Experience our online tutoring with a complimentary 30-minute free trial session exclusively for new users to explore our services.'
    },
    {
        header: 'Can your tutors assist with college website homework',
        content: 'Yes, our tutors provide comprehensive support for various college websites like Mastering Physics, Mastering Engineering, Webassign, Wileyplus, Canvas, Blackboard, Moodle, and more.'
    },
    {
        header: 'Is it possible to ask doubts during tutoring sessions?',
        content: 'Absolutely! Feel free to ask your questions anytime during the session.'
    },
    {
        header: 'Can I engage with the tutor using the whiteboard?',
        content: 'Yes, interaction is encouraged! You can write on the whiteboard to ask questions and enhance your learning experience.'
    },
    {
        header: 'How can I share files with the tutor?',
        content: `You can easily upload files through the whiteboard's upload/share button. Alternatively, you can share files via WhatsApp or email, and we'll ensure they reach the tutor.`
    },
    {
        header: 'Is video available during tutoring sessions?',
        content: 'Our sessions primarily involve voice communication. Video is not necessary for effective learning, as our tutors utilize real-time collaboration on an online whiteboard.'
    },
    {
        header: 'Can I record tutoring sessions for future reference?',
        content: 'Yes, all sessions are recorded using Google Meet. Additionally, you can record sessions on your device or take screenshots.'
    },
    {
        header: 'Are there free tutoring sessions available?',
        content: 'Currently, we do not offer free tutoring. Our service involves real human tutors, ensuring personalized assistance.'
    },
    {
        header: 'Which countries does OWNTEACHER cover?',
        content: 'We cater to students in the USA, Canada, UK, Australia, Germany, and various Middle Eastern countries, among others.'
    },
    {
        header: 'Will tutors be familiar with my syllabus?',
        content: 'Our tutors are adept at teaching science subjects, which generally have standardized syllabi across regions.'
    },
    {
        header: 'Do we follow specific textbooks?',
        content: 'You can share your textbooks or lecture notes, and our tutors will tailor sessions accordingly.'
    },
    {
        header: 'Can tutors help with concept learning and problem-solving techniques?',
        content: 'Certainly! Our tutors excel in explaining concepts and providing problem-solving strategies.'
    },
    {
        header: 'Can assistance be provided for exams?',
        content: 'Yes, we offer exam preparation assistance. However, live exam question assistance is not provided to uphold academic integrity.'
    },
    {
        header: 'What grades do you cater to?',
        content: 'We primarily cater to students from grades 9 to 12 and middle school, but we also assist engineering undergraduates.'
    },
    {
        header: 'Do you have tutors specifically for AP exams?',
        content: `While we don't specialize in dedicated AP exam tutors, our tutors are well-versed in the AP syllabus. Rest assured, our online AP tutoring services offer excellent support tailored to your needs.`
    },
    {
        header: 'Which topics are covered in each subject?',
        content: 'We cover all topics according to your curriculum or preferred learning materials.'
    },
    {
        header: 'What equipment is needed for sessions?',
        content: 'We recommend using a digital pen pad or Apple Pencil with an iPad for optimal interaction.'
    },
    {
        header: 'How do 1-on-1 tutoring sessions benefit students?',
        content: 'Our personalized sessions ensure understanding of concepts and techniques, leading to improved grades.'
    },
    {
        header: 'Do you guarantee top grades?',
        content: 'We guarantee significant grade improvement and provide further details upon inquiry.'
    },
    {
        header: 'Is the service affordable?',
        content: 'Our service is competitively priced, offering value for money. Visit our Pricing page for details.'
    },
    {
        header: 'What is the refund policy?',
        content: 'Refunds can be requested through WhatsApp, and we strive to provide satisfactory resolutions promptly.'
    },
    {
        header: 'Are prices negotiable?',
        content: 'Tutoring prices are fixed, but homework help fees may be slightly negotiable.'
    },
    {
        header: 'Can I choose my tutor?',
        content: 'Yes, you can request a specific tutor or let us assign one based on your needs.'
    },
    {
        header: 'Are sessions live or pre-recorded?',
        content: 'All sessions are live with real tutors, providing personalized attention.'
    },
    {
        header: 'Are sessions strictly private?',
        content: 'Yes, sessions are private 1:1 interactions with the tutor.'
    },
    {
        header: 'How does the homework help service work?',
        content: 'Share your homework via WhatsApp, and our tutors will provide assistance accordingly.'
    },
    {
        header: 'How do online tutoring sessions function?',
        content: 'Sessions are conducted through Google Meet, allowing real-time interaction and collaboration.'
    },
    {
        header: `What if I'm unsatisfied with my assigned tutor?`,
        content: `We'll assign a different tutor or provide a refund if necessary.`
    },
    {
        header: 'What Qualifications Do Your Tutors Have?',
        content:
            'Our tutors are distinguished by their academic excellence, holding degrees from top universities. The majority are engineers with a B.Tech degree as a minimum, and many possess or are pursuing Master’s and Ph.D. degrees. Known for their high-speed problem-solving skills, they deliver a perfect blend of knowledge, speed, and accuracy.'
    },
    {
        header: 'What Payment Methods Do You Accept?',
        content:
            'We accept payments via PayPal and RazorPay, offering easy guest payment options. Domestic students in India have the option of direct bank transfers, while international students can use PayPal or RazorPay for efficient transactions.'
    },
    {
        header: 'How Can I Book Online Homework Help?',
        content: `Booking online homework help is simple:
                  1. Contact us through WhatsApp by clicking HERE.
                  2. Complete the payment process using PayPal or RazorPay.
                  3. Receive your solutions in time to submit your assignment.
                `
    },
    {
        header: 'What Are Your Charges for Online Homework Help?',
        content: 'Our charges are based on the complexity and duration of the assignment. We strive to offer competitive prices for our value-driven services. For detailed pricing, please refer to our pricing page.'
    },
    {
        header: 'How Can I Contact You?',
        content: 'You can easily reach us via the ‘Chat with Us’ option on WhatsApp on our website or directly click HERE. For more contact options, visit our Contact Us page.'
    },
    {
        header: 'Can I Pay After Delivery?',
        content: 'As per our policy, we require full advance payment before our tutors begin work. This policy ensures our tutors are fairly compensated for their time and effort.'
    },
    {
        header: 'Can I Propose My Own Fee?',
        content: 'Yes, you may propose a fee, but the final decision lies with the tutor, adhering to our pricing guidelines. We ensure our prices are both fair and reflective of the quality service we provide.'
    },
    {
        header: 'What If My Payment Via PayPal Is Not Acknowledged?',
        content: 'If you encounter any issues with PayPal payments, we recommend waiting a few hours before checking again. If the problem persists, inform us, and we will also verify on our end to resolve the issue quickly.'
    },
    {
        header: 'How Are Refunds Processed?',
        content:
            'Refunds are issued back to the original PayPal account used for payment. If receiving a refund in that account is not possible, the amount can be credited towards future services. More information can be found on our Refund Policy page.'
    },
    {
        header: 'How Do You Ensure Tutor Quality?',
        content: 'Our tutors are selected based on their academic credentials and teaching performance. Regular evaluations ensure they continue to meet our high standards of quality output.'
    },
    {
        header: 'Can I Request a Specific Tutor?',
        content: 'Yes, you may request a specific tutor, and we will do our best to accommodate your request based on the tutor’s availability.'
    },
    {
        header: 'How Can I Trust Your Service for Online Homework Help?',
        content: 'With over 15 years of experience in assisting students, Ownteacher has established a reputation for quality and reliability. Our commitment to plagiarism-free, high-quality work is evident in the grades our students achieve.'
    },
    {
        header: `I'm Hesitant to Reach Out. What Should I Do?`,
        content: 'Trust in the positive feedback from your peers who have used our services. We encourage you to try our services for yourself and experience the quality and support we offer.'
    },
    {
        header: 'How Do You Ensure Solutions Are Plagiarism-Free?',
        content: 'We prioritize delivering unique and plagiarism-free solutions. Our tutors are regularly trained on academic integrity standards, and any deviations are addressed promptly and seriously.'
    },
    {
        header: 'What Grades Can I Expect With Your Help?',
        content: 'Our track record shows that students who use our services often achieve top grades. We guarantee the quality of our work and the improvement it brings to your academic performance.'
    },
    {
        header: 'Will You Be Adding More Subjects to Your Service?',
        content: 'Yes, we continuously expand our subject offerings. Check our website for the most current list and feel free to inquire about subjects not listed.'
    },
    {
        header: 'What Subjects Do You Offer Help With?',
        content:
            'Our range of subjects includes Physics, Engineering Mechanics, Mathematics, Computer Science, and more. For a comprehensive list, click HERE. If your subject is not listed, contact us, and we’ll do our best to accommodate your needs.'
    },
    {
        header: 'How Can I Cancel a Scheduled Session?',
        content: 'Cancellations are possible before the tutor starts working on your request. Depending on the work progress at the time of cancellation, a full or partial refund will be processed.'
    },
    {
        header: 'What If the Service Is Not Delivered On Time?',
        content: 'While we always aim for timely delivery, in rare cases of delay, we will assess the situation and offer appropriate compensation, ensuring fairness and satisfaction.'
    },
    {
        header: 'What Happens If I Am Not Satisfied With My Grades?',
        content: 'If you are not satisfied with the grades received after our assistance, please contact us to discuss the situation. We are open to reviewing the case and discussing compensation or refund options.'
    },
    {
        header: 'Do You Offer Live Assignment Help?',
        content: 'Yes, we offer live assignment help in over 100 subjects, providing real-time assistance without waiting.'
    },
    {
        header: 'How Long Should I Wait for a Response on WhatsApp?',
        content: 'We strive for immediate responses. If you don’t receive a reply within a few minutes, please expect to hear from us within 3-6 hours.'
    },
    {
        header: 'How Can I Book an Online Tutoring or Problem-Solving Session?',
        content: `To book a session:
              1. Contact us via WhatsApp/ E-mail and book a demo.
              2. Make the payment.
              3. Join the session at the scheduled time through the provided Google Meet link.
        `
    },
    {
        header: 'What are the rates for online tutoring?',
        content: 'Our online tutoring rates range from $14 to $25 per hour, determined by grade level and set by our tutors following our guidelines. Rest assured, our fees offer affordability and value. Check our pricing page for details.'
    },
    {
        header: 'Can I propose a specific fee for online tutoring?',
        content: 'Fees for online tutoring sessions are fixed and non-negotiable, ensuring affordability and value for money. Visit our pricing page for more information.'
    },
    {
        header: 'Can I extend my session with the same tutor?',
        content: "Yes, you can extend your session by paying before the initial session ends, contingent upon the tutor's availability."
    },
    {
        header: 'Can I choose a particular tutor for my online tutoring or problem-solving help?',
        content: "Certainly! If you have a preferred tutor, inform us in advance, and we'll endeavor to assign them to your session, subject to availability."
    },
    {
        header: 'What language is used for instruction?',
        content: 'English serves as the primary medium of instruction for our online tutoring and homework help services, though some tutors may be proficient in other languages.'
    },
    {
        header: 'What are the hardware and software requirements?',
        content:
            "To effectively participate in our sessions, you'll need a computer or tablet with an updated web browser and a stable internet connection. Mobile phones are not recommended due to screen size limitations. A high-speed broadband connection is recommended for optimal experience."
    },
    {
        header: 'Which software do you use for tutoring?',
        content: 'We utilize an online whiteboard equipped with audio, video, and file-sharing features to facilitate real-time interaction between students and tutors.'
    },
    {
        header: 'Can I receive a recording of the session?',
        content: 'While video recording is not available, screenshots can be provided upon request.'
    },
    {
        header: 'Will you offer a refund if I encounter issues accessing the online whiteboard during my tutoring session?',
        content: 'We ensure our tutors meet hardware and software requirements for sessions. Refunds may be considered based on circumstances. Please contact us for further assistance.'
    },
    {
        header: 'How do I cancel an online tutoring session?',
        content: 'Cancellation policies vary based on timing. Contact us via WhatsApp to initiate cancellations and discuss refund options.'
    },
    {
        header: 'How do I reschedule an online tutoring session?',
        content: 'Rescheduling is possible with certain conditions. Contact us via WhatsApp to discuss rescheduling options and associated charges.'
    },
    {
        header: 'What if my Preferred Tutor is Unavailable?',
        content: 'If your preferred tutor is unavailable, consider alternative time slots or select another available tutor. Flexibility can enhance scheduling options.'
    }
];
</script>

<template>
    <Accordion :activeIndex="0">
        <AccordionTab v-for="(item, idx) in faqList" :key="idx" :header="item.header">
            <p class="m-0">
                {{ item.content }}
            </p>
        </AccordionTab>
    </Accordion>
</template>
