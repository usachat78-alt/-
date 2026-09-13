import { CreatedFormResult } from '../types';
import {
  EXAM_TITLE,
  EXAM_DESCRIPTION,
  STUDENT_INFO_FIELDS,
  EXAM_QUESTIONS,
} from '../data/examData';

export async function createGoogleFormExam(accessToken: string): Promise<CreatedFormResult> {
  // Step 1: Create new Google Form
  const createResponse = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: EXAM_TITLE,
        documentTitle: 'ข้อสอบเก็บคะแนน ตรรกศาสตร์ ม.4',
      },
    }),
  });

  if (!createResponse.ok) {
    const errBody = await createResponse.text();
    console.error('Error creating Google Form:', createResponse.status, errBody);
    throw new Error(`ไม่สามารถสร้างแบบฟอร์มได้ (${createResponse.status}): ${errBody}`);
  }

  const formMeta = await createResponse.json();
  const formId = formMeta.formId;
  const responderUri = formMeta.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  // Step 2: Build batchUpdate requests to add description, student fields, and all 20 questions
  const requests: any[] = [];

  // Update description
  requests.push({
    updateFormInfo: {
      info: {
        description: EXAM_DESCRIPTION,
      },
      updateMask: 'description',
    },
  });

  let currentIndex = 0;

  // Student Info Field 1: ชื่อ-สกุล (Short answer)
  requests.push({
    createItem: {
      item: {
        title: 'ชื่อ-สกุล',
        description: 'กรุณากรอกชื่อและนามสกุลจริง',
        questionItem: {
          question: {
            required: true,
            textQuestion: {
              paragraph: false,
            },
          },
        },
      },
      location: {
        index: currentIndex++,
      },
    },
  });

  // Student Info Field 2: ห้อง (4/7, 4/14)
  requests.push({
    createItem: {
      item: {
        title: 'ห้อง',
        description: 'เลือกห้องเรียนของนักเรียน',
        questionItem: {
          question: {
            required: true,
            choiceQuestion: {
              type: 'RADIO',
              options: [{ value: '4/7' }, { value: '4/14' }],
              shuffle: false,
            },
          },
        },
      },
      location: {
        index: currentIndex++,
      },
    },
  });

  // Student Info Field 3: เลขที่ (Short answer)
  requests.push({
    createItem: {
      item: {
        title: 'เลขที่',
        description: 'กรุณากรอกเลขที่ประจำตัวในห้องเรียน',
        questionItem: {
          question: {
            required: true,
            textQuestion: {
              paragraph: false,
            },
          },
        },
      },
      location: {
        index: currentIndex++,
      },
    },
  });

  // Add all 20 exam questions
  for (const q of EXAM_QUESTIONS) {
    requests.push({
      createItem: {
        item: {
          title: q.prompt,
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: 'RADIO',
                options: q.options.map((opt) => ({
                  value: opt,
                })),
                shuffle: false,
              },
            },
          },
        },
        location: {
          index: currentIndex++,
        },
      },
    });
  }

  // Execute batchUpdate
  const batchResponse = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      includeFormInResponse: true,
      requests,
    }),
  });

  if (!batchResponse.ok) {
    const errBody = await batchResponse.text();
    console.error('Error adding questions to Google Form:', batchResponse.status, errBody);
    throw new Error(`สร้างแบบฟอร์มสำเร็จแล้วแต่ไม่สามารถเพิ่มข้อสอบได้ (${batchResponse.status}): ${errBody}`);
  }

  const batchResult = await batchResponse.json();
  const finalResponderUri =
    batchResult.form?.responderUri || formMeta.responderUri || responderUri;

  return {
    formId,
    title: EXAM_TITLE,
    description: EXAM_DESCRIPTION,
    responderUri: finalResponderUri,
    editUri,
    createdAt: new Date().toISOString(),
  };
}
