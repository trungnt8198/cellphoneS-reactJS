import { object, string } from "yup";
import Accordion from "../../components/Accordion/Accordion";
import AccordionItem from "../../components/Accordion/AccordionItem";
import Form from "../../components/Form/Form";
import TextInput from "../../components/Form/TextInput";
import Tab from "../../components/Tabs/Tab";
import Tabs from "../../components/Tabs/Tabs";

const schema = object({
  email: string()
    .email("Phải đúng định dạng email")
    .required("Không được bỏ trống email"),
  password: string().required("Không được bỏ trống password"),
});

function Home() {
  return (
    <>
      <div>
        <h1>Tabs Component</h1>
        <Tabs defaultIndex={0} onChange={(index) => console.log(index)}>
          <Tab title="Tab 1">Content of Tab 1</Tab>
          <Tab title="Tab 2">Content of Tab 2</Tab>
          <Tab title="Tab 3">Content of Tab 3</Tab>
        </Tabs>
      </div>
      <br />
      <div>
        <h1>Accordion Component</h1>
        <Accordion
          defaultIndex={0}
          onChange={(index) => console.log(index)}
          collapseOthers={false}
        >
          <AccordionItem header="Accordion 1">
            Nội dung của Accordion 1
          </AccordionItem>
          <AccordionItem header="Accordion 2">
            Nội dung của Accordion 2
          </AccordionItem>
          <AccordionItem header="Accordion 3">
            Nội dung của Accordion 3
          </AccordionItem>
        </Accordion>
      </div>
      <br />
      <h1>Form Component</h1>
      <Form onSubmit={(data) => console.log(data)} schema={schema}>
        <TextInput name="email" placeholder="Nhập email..." />
        <TextInput
          name="password"
          type="password"
          placeholder="Nhập password..."
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default Home;
