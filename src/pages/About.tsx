import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About WanderLuxe</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Welcome to WanderLuxe, your premier destination for luxury travel experiences. Founded with a passion for creating unforgettable journeys, we specialize in curating exceptional travel packages that combine comfort, adventure, and cultural immersion.
              </p>
              <p className="text-lg mb-4">
                Our team of experienced travel experts works tirelessly to ensure that every aspect of your journey is meticulously planned and executed. From selecting the finest accommodations to arranging exclusive experiences, we take pride in delivering travel experiences that exceed expectations.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                At WanderLuxe, our mission is to transform ordinary trips into extraordinary adventures. We believe that travel is not just about reaching a destination, but about the journey itself and the memories created along the way.
              </p>
              <p className="text-lg mb-4">
                We are committed to providing personalized service, ensuring that each traveler's unique preferences and needs are met with attention to detail and care.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-ocean mr-2">•</span>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Curation</h3>
                    <p>Carefully selected destinations and experiences that promise unforgettable memories.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean mr-2">•</span>
                  <div>
                    <h3 className="font-semibold mb-1">Premium Service</h3>
                    <p>Dedicated support throughout your journey, ensuring a seamless travel experience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean mr-2">•</span>
                  <div>
                    <h3 className="font-semibold mb-1">Quality Assurance</h3>
                    <p>Partnerships with top-tier hotels, airlines, and service providers for the best quality.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean mr-2">•</span>
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Experience</h3>
                    <p>Tailored travel packages that cater to your specific preferences and requirements.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About; 