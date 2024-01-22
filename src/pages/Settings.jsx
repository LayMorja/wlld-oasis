import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";
import Row from "../ui/Row.jsx";

function Settings() {
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <Row>
        <UpdateSettingsForm />
      </Row>
    </>
  );
}

export default Settings;
