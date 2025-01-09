import { GiComb } from 'react-icons/gi';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { FaHouse } from 'react-icons/fa6';
import Category from './Category';
import { useSpring, animated } from '@react-spring/web';
import { fadeInConfig } from '../../configs/animationConfigurations';

const categoryList = [
  {
    categoryName: 'Dịch vụ spa',
    categoryDesc:
      'Chúng tối biết cách làm thế nào để thú cưng của bạn trở nên đẳng cấp và cá tính hơn. Với dịch vụ cắt tỉa lông thú cưng chúng tôi sẽ giúp các bé trở thành phiên bản hoàn hảo nhất...',
    categoryIcon: (
      <GiComb size={'6rem'} className='text-secondary-light mb-6' />
    ),
    categoryPath: 'dich-vu-spa',
  },
  {
    categoryName: 'Thức ăn chó, mèo',
    categoryDesc:
      'Cùng với hơn 3.000 khách hàng đã luôn tin tưởng, đồng hành, chúng tôi luôn đặt ra những mục tiêu và thử thách mới. PET SERVICE cung cấp các sản phẩm, phụ kiện rất đa dạng...',
    categoryIcon: (
      <GiOpenedFoodCan size={'6rem'} className='text-secondary-light mb-6' />
    ),
    categoryPath: 'thuc-an-cho-meo',
  },
  {
    categoryName: 'Dịch vụ khách sạn',
    categoryDesc:
      'Mọi hành động ở PET SERVICE đều bắt đầu từ sứ mệnh Trao Gửi Yêu Thương. Mọi thú cưng mới khi đến với chúng tôi đều được quan tâm đặc biệt bởi đội ngũ Nhân viên nhiều kinh nghiệm...',
    categoryIcon: (
      <FaHouse size={'6rem'} className='text-secondary-light mb-6' />
    ),
    categoryPath: 'khach-san-thu-cung',
  },
];

const CategoryList = () => {
  const fadeIn = useSpring(fadeInConfig());

  return (
    <animated.div style={fadeIn} className='px-32 mb-12'>
      <h1 className='uppercase text-primary-light text-3xl text-center font-bold mb-4'>
        Dịch vụ của PetLuv
      </h1>
      <div className='flex justify-between items-center gap-4'>
        {categoryList.map((item, index) => (
          <Category
            key={`category-${index}`}
            categoryName={item.categoryName}
            categoryDesc={item.categoryDesc}
            categoryIcon={item.categoryIcon}
            categoryPath={item.categoryPath}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default CategoryList;
