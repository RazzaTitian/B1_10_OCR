import { ButtonPrimary, ButtonSecondary } from "@/templates/buttons";
import { poppins, oxygen } from "@/templates/font";
import { Image } from "@nextui-org/react";
import Link from "next/link";

const Card = ({img, caption, label}) => {
  return (
    <div className={oxygen + "flex flex-col flex-shrink-0 w-min border border-[#f3f9fc] p-3 pb-6 rounded-3xl"}>
      <Image
        src={img}
        alt=""
        isZoomed
        className="aspect-[4/5] min-w-80"
      />
      {
        label
      }
      <p className="w-[4/5] text-pretty">
        {caption}
      </p>
    </div>
  )
}

const AcademyHook = () => {
  return (
    <main className="w-full py-20 flex justify-center">
      <div className="w-[80%] max-w-[1300px] flex flex-col items-center gap-10">
        <div about="section-heading" className="mb-12 flex flex-col items-center">
          <h2 className={poppins + "text-[27px] font-semibold capitalize text-teal-secondary text-center"}>
            SHORELAB ACADEMY 2025
          </h2>
          <h1 className={poppins + "text-[48px] font-semibold text-primary-dark leading-tight text-center text-pretty"}>
            Leading Marine Conservation Through Tech Innovation
          </h1>
        </div>
        <div className="flex flex-row justify-center items-start gap-5">
          <Card 
            img="/static/home-shorelab_1.png"
            // source google maps
            label={
              <label className={"my-6 text-[15px] px-4 py-1 rounded-full w-fit bg-salmon-accent/25 text-salmon-accent"}>
                Discover
              </label>
            }
            caption="Explore marine ecosystems, understand environmental challenges, and dive into socio-cultural dynamics."
          />
          <Card 
            img="/static/home-shorelab_2.png"
            // source google maps
            label={
              <label className={"my-6 text-[15px] px-4 py-1 rounded-full w-fit bg-teal-secondary/25 text-teal-secondary"}>
                Engage
              </label>
            }
            caption="Collaborate with industry experts, participate in fieldwork, and contribute to real-world marine conservation projects."
          />
          <Card 
            img="/static/home-shorelab_3.jpg"
            // source https://statik.tempo.co/data/2022/04/04/id_1100522/1100522_720.jpg
            label={
              <label className={"my-6 text-[15px] px-4 py-1 rounded-full w-fit bg-[#83B26E]/25 text-[#83B26E]"}>
                Innovate
              </label>
            }
            caption="Develop tech-driven solutions, create sustainable products, and present your Capstone Project to industry leaders."
          />
        </div>
        <div className="flex gap-6">
          <Link href="/initiatives/shorelab-academy">
            <ButtonSecondary>Learn More</ButtonSecondary>
          </Link>
          <Link href="/initiatives/shorelab-academy/form">
            <ButtonPrimary>Apply Now</ButtonPrimary>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AcademyHook;
