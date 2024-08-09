import Header from "@/components/header";
import { getDictionary } from "@/services/dictionaries";
import HomeComp from "@/components/common/homeComp";

const Home = async ({ params }) => {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} />
      <HomeComp dict={dict} lang={lang}/>
    </>
  );
};

export default Home;
