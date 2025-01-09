import ServiceCard from './ServiceCard';

const serviceList = [
  {
    serviceName: 'Tắm chó',
    serviceDesc:
      'Thú cưng của bạn đang muốn tìm một spa thú cưng chất lượng và đáng tin cậy để tắm vệ sinh. Vì thế, Pet Service sẽ giới thiệu đến các bạn trung tâm chăm sóc thú cưng chuyên nghiệp với đội ngũ nhân viên dầy dặn kinh nghiêm, chúng tôi cung cấp Combo Tắm Vệ Sinh để thú cưng của bạn được sạch sẽ thơm tho sau 9 bước.',
    serviceImagePath: './dog-grooming.jpg',
  },
  {
    serviceName: 'Tắm chó',
    serviceDesc:
      'Thú cưng của bạn đang muốn tìm một spa thú cưng chất lượng và đáng tin cậy để tắm vệ sinh. Vì thế, Pet Service sẽ giới thiệu đến các bạn trung tâm chăm sóc thú cưng chuyên nghiệp với đội ngũ nhân viên dầy dặn kinh nghiêm, chúng tôi cung cấp Combo Tắm Vệ Sinh để thú cưng của bạn được sạch sẽ thơm tho sau 9 bước.',
    serviceImagePath: './dog-grooming.jpg',
  },
  {
    serviceName: 'Tắm chó',
    serviceDesc:
      'Thú cưng của bạn đang muốn tìm một spa thú cưng chất lượng và đáng tin cậy để tắm vệ sinh. Vì thế, Pet Service sẽ giới thiệu đến các bạn trung tâm chăm sóc thú cưng chuyên nghiệp với đội ngũ nhân viên dầy dặn kinh nghiêm, chúng tôi cung cấp Combo Tắm Vệ Sinh để thú cưng của bạn được sạch sẽ thơm tho sau 9 bước.',
    serviceImagePath: './dog-grooming.jpg',
  },
  {
    serviceName: 'Tắm chó',
    serviceDesc:
      'Thú cưng của bạn đang muốn tìm một spa thú cưng chất lượng và đáng tin cậy để tắm vệ sinh. Vì thế, Pet Service sẽ giới thiệu đến các bạn trung tâm chăm sóc thú cưng chuyên nghiệp với đội ngũ nhân viên dầy dặn kinh nghiêm, chúng tôi cung cấp Combo Tắm Vệ Sinh để thú cưng của bạn được sạch sẽ thơm tho sau 9 bước.',
    serviceImagePath: './dog-grooming.jpg',
  },
];

const ServiceCardList = () => {
  return (
    <section className='flex justify-between items-center gap-4 mb-16'>
      {serviceList.map((service, index) => (
        <ServiceCard key={`service-${index}`} service={service} />
      ))}
    </section>
  );
};

export default ServiceCardList;
