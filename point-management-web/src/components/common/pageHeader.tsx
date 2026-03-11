import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface PmsPageHeaderProps {
  title: string;
  description?: string;
  padding?: number | object;
}

const PmsPageHeader: React.FC<PmsPageHeaderProps> = ({ 
  title, 
  description, 
  padding = { xs: 2, sm: 4 } 
}) => {
  return (
    <Box sx={{ px: padding, pt: padding, pb: 0 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 700, 
          color: '#1E293B', 
          fontFamily: 'Inter, sans-serif' 
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 500, mt: 1 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default PmsPageHeader;
