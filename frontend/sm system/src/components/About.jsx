import React from 'react'

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-center mb-4 max-w-2xl">
        We are a dedicated team of professionals committed to providing top-notch services to our clients. Our mission is to ensure customer satisfaction through quality service and support.
      </p>
      <p className="text-lg text-center mb-4 max-w-2xl">
        With years of experience in the industry, we understand the needs of our customers and strive to exceed their expectations. Our team is equipped with the skills and knowledge to handle a variety of service requests efficiently and effectively.
      </p>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Integrity: We believe in honesty and transparency in all our dealings.</li>
          <li>Quality: We are committed to delivering high-quality services.</li>
          <li>Customer Focus: Our customers are at the heart of everything we do.</li>
          <li>Innovation: We embrace change and continuously seek to improve our services.</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">John Mathew</h3>
            <p className="text-gray-600">CEO</p>
            <p className="mt-2">John has over 10 years of experience in service management and leads our team with a vision for excellence.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Johnny David</h3>
            <p className="text-gray-600">Operations Manager</p>
            <p className="mt-2">Johnny ensures that our operations run smoothly and efficiently, focusing on customer satisfaction.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Mikhal Johnson</h3>
            <p className="text-gray-600">Customer Support Lead</p>
            <p className="mt-2">Mikhal is dedicated to providing exceptional support to our clients, ensuring their needs are met.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About