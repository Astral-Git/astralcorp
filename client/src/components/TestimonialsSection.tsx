import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    rating: 5,
    content: "The website was clean, responsive, and delivered on time.",
    name: "Arjun",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    rating: 5,
    content: "They perfectly captured the vibe of my brand through the logo.",
    name: "Sneha",
    role: "Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    rating: 5,
    content: "Super smooth process from start to finish. Highly recommend.",
    name: "Ravi",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 4,
    rating: 5,
    content: "Very professional and creative. Loved the outcome!",
    name: "Priya",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 5,
    rating: 5,
    content: "Reliable, innovative, and incredibly talented team.",
    name: "Rahul",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex text-blue-400 mb-4" aria-label={`${count} star rating`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({
  rating,
  content,
  name,
  role,
  image,
}: {
  rating: number;
  content: string;
  name: string;
  role: string;
  image: string;
}) {
  return (
    <motion.div
      className="testimonial-card p-6 rounded-2xl bg-white shadow-lg dark:bg-black-900"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <StarRating count={rating} />
      <blockquote className="text-lg mb-4 italic">"{content}"</blockquote>
      <div className="flex items-center">
        <img
          src={image}
          alt={`Photo of ${name}`}
          className="w-12 h-12 rounded-full mr-4 object-cover"
          loading="lazy"
        />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-while-400 text-sm">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerSlide = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + cardsPerSlide) % testimonials.length
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const end = currentIndex + cardsPerSlide;
    return end <= testimonials.length
      ? testimonials.slice(currentIndex, end)
      : [
          ...testimonials.slice(currentIndex),
          ...testimonials.slice(0, end - testimonials.length),
        ];
  };

  return (
    <section className="py-20 section-blur" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground"
          >
            What Our Clients Say
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getVisibleTestimonials().map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
