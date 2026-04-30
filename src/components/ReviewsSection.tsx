import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aarav Sharma",
    role: "Content Creator",
    rating: 5,
    text: "First cut nailed the vision. My reels started outperforming everything I'd posted before — retention up, comments up, sales up.",
  },
  {
    name: "Priya Mehta",
    role: "YouTuber",
    rating: 5,
    text: "Cinematic, clean, on-brand. Watch-time jumped 3x within a month. Bhaskar treats every video like it's his own channel.",
  },
  {
    name: "Rohan Verma",
    role: "Startup Founder",
    rating: 5,
    text: "Easily the most reliable editor I've worked with. Fast turnarounds, sharp pacing, and zero hand-holding. Booked again the same week.",
  },
  {
    name: "Sneha Kapoor",
    role: "Fitness Coach",
    rating: 5,
    text: "My promo looked like a Nike ad. Bookings doubled the month it went live. Worth every rupee.",
  },
  {
    name: "Daniel Cooper",
    role: "Podcast Host",
    rating: 5,
    text: "Delivered ahead of schedule and nailed the pacing. Audience retention on YouTube clips is the best it's ever been.",
  },
  {
    name: "Ishita Rao",
    role: "Brand Owner",
    rating: 5,
    text: "He turned raw footage into a story that actually moved people. Our launch video crossed 100K views in a week.",
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-card glow-border p-6 relative h-full flex flex-col"
    >
      <Quote className="w-8 h-8 text-primary/40 absolute top-4 right-4" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
        "{review.text}"
      </p>
      <div className="border-t border-border/40 pt-4">
        <p className="font-display font-semibold text-foreground">{review.name}</p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {review.role}
        </p>
      </div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Words From <span className="gradient-text">Clients.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Real results from creators, founders, and brands who hit publish — and watched the numbers move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
