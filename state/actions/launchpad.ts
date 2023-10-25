import { FORM_CHECKBOX, FORM_RADIO, FORM_SELECT } from "helpers/core-constants";
import { toast } from "react-toastify";
import {
  getLaunchpadList,
  getLaunchpadListDetails,
  launchpadBuyIcoToken,
  launchpadDynamicFrom,
  launchpadDynamicFromSubmit,
} from "service/launchpad";

export const getLaunchpadListAction = async (
  setLaunchpadList: any,
  setLaunchpadFeatureItem: any
) => {
  let featuredItem: any = [];
  const response = await getLaunchpadList();
  response?.data?.map((item: any, index: number) => {
    item.is_featured == 1 && featuredItem.push(item);
  });
  setLaunchpadList(response);
  setLaunchpadFeatureItem(featuredItem);
};
export const getLaunchpadListDetailsAction = async (
  setLaunchpadListDetails: any,
  id: any
) => {
  const response = await getLaunchpadListDetails(id);
  setLaunchpadListDetails(response);
};

export const launchpadBuyIcoTokenAction = async () => {
  const response = await launchpadBuyIcoToken();
  return response;
};

//find binary search in javascript.

export const launchpadDynamicFromSubmitAction = async (
  payload: any,
  launchpadForm: any
) => {
  const formData = new FormData();
  let i = 0;
  launchpadForm.map((item: any) => {
    if (item.type === FORM_CHECKBOX) {
      // payload[item.id].form_id}
      formData.append(`ids[${i}]`, payload[item.id].form_id);
      formData.append(`values[${i}]`, String(payload[item.id].value));
      i++;
      return;
    }
    formData.append(`ids[${i}]`, payload[item.id].form_id);
    formData.append(`values[${i}]`, payload[item.id].value);
    i++;
    // formData.append(payload[item.id].form_id, payload[item.id].value);
  });
  const response = await launchpadDynamicFromSubmit(formData);
  if (response.success === true) {
    toast.success(response.message);
  } else if (response.success === false) {
    toast.error(response.message);
  }
  return response;
};

export const launchpadDynamicFromAction = async (
  setLaunchpadForm: any,
  formFields: any,
  setFormFields: any,
  setLoading: any
) => {
  const response = await launchpadDynamicFrom();
  setLaunchpadForm(response.data);
  let tempJson: any = {};
  response?.data?.dynamic_form?.map((item: any) => {
    console.log(item, "item.type === FORM_RADIOitem.type === FORM_RADIO");
    tempJson[item.id] = {
      value:
        item.type === FORM_CHECKBOX
          ? []
          : item.type === FORM_RADIO
          ? [item?.optionList.length > 0 && item?.optionList[0]]
          : "",
      form_id: item.id,
    };
  });
  setFormFields(tempJson);
  setLoading(false);
};
