import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Target } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue: number;
  growth: number;
  icon: string;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  growth,
  icon,
  index
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const step = value / (duration / 16);
      let current = 0;
      
      const animate = () => {
        current += step;
        if (current >= value) {
          setAnimatedValue(value);
        } else {
          setAnimatedValue(current);
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, index * 200);

    return () => clearTimeout(timer);
  }, [value, index]);

  const getIcon = () => {
    switch (icon) {
      case 'revenue':
        return <DollarSign className="w-6 h-6" />;
      case 'revpar':
        return <BarChart3 className="w-6 h-6" />;
      case 'occupancy':
        return <Users className="w-6 h-6" />;
      case 'adr':
        return <Target className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const formatValue = (val: number) => {
    if (icon === 'revenue') {
      return `$${val.toLocaleString()}`;
    } else if (icon === 'occupancy') {
      return `${val.toFixed(1)}%`;
    } else if (icon === 'revpar' || icon === 'adr') {
      return `$${val.toFixed(2)}`;
    }
    return val.toFixed(0);
  };

  const isPositive = growth >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {getIcon()}
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
          isPositive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(growth).toFixed(1)}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-2xl font-bold text-gray-900">
          {formatValue(animatedValue)}
        </div>
        <p className="text-xs text-gray-500">
          vs {formatValue(previousValue)} last year
        </p>
      </div>
    </motion.div>
  );
};

export default MetricCard;