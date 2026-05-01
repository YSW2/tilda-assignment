import { useState, type SubmitEvent } from 'react';
import { useLayoutStore } from '../store/layoutStore';
import useInquiryForm from '../hook/useInquiryForm';
import { FaCheck } from 'react-icons/fa';
import ValidatedInput from '../components/common/ValidateInput';
import SubmitButton from '../components/common/SubmitButton';
import FormField from '../components/common/FormField';

const InquiryPage = () => {
    const { setMenu } = useLayoutStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { handleChange, formData, errors, isFormValid, resetForm } = useInquiryForm();

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        localStorage.setItem('inquiry_form', JSON.stringify(formData));
        setIsSubmitted(true);
    };

    const handleReset = () => {
        resetForm();
        setIsSubmitted(false);
    };

    const handleBackToDashboard = () => {
        setMenu('home');
        handleReset();
    };

    if (isSubmitted) {
        return (
            <div className="bg-gray-50 min-h-full p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        {/* 성공 헤더 */}
                        <div className="p-8 text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaCheck color="#43a047" size={24} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                문의가 접수되었습니다
                            </h2>
                            <p className="text-gray-600">빠른 시일 내에 답변드리겠습니다.</p>
                        </div>

                        {/* 버튼 영역 */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex gap-3 justify-center flex-wrap">
                                <button
                                    onClick={handleBackToDashboard}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                                >
                                    대시보드로 돌아가기
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
                                >
                                    다른 문의 접수하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-full p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">문의하기</h1>
                    <p className="text-sm text-gray-500">
                        궁금하신 사항이나 문의사항을 남겨주세요. 빠르게 답변드리겠습니다.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
                    {/* 헤더 */}
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            문의 폼
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다.
                        </p>
                    </div>

                    {/* 본문 */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                        <div className="p-6 space-y-5 flex-1">
                            {/* 성함 */}
                            <FormField label="성함" required error={errors.name}>
                                <ValidatedInput
                                    type="text"
                                    name="name"
                                    placeholder="성함을 입력하세요 (2~20자)"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                            </FormField>

                            {/* 이메일 */}
                            <FormField label="이메일" required error={errors.email}>
                                <ValidatedInput
                                    type="email"
                                    name="email"
                                    placeholder="이메일을 입력하세요"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                            </FormField>

                            {/* 회사 */}
                            <FormField label="회사" error={errors.company}>
                                <ValidatedInput
                                    type="text"
                                    name="company"
                                    placeholder="회사명을 입력하세요 (2~20자)"
                                    value={formData.company}
                                    onChange={handleChange}
                                    error={errors.company}
                                />
                            </FormField>

                            {/* 내용 */}
                            <FormField label="문의 내용" required error={errors.content}>
                                <textarea
                                    name="content"
                                    placeholder="문의하실 내용을 상세히 작성해주세요"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={8}
                                    required
                                    className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all resize-y border-gray-300 focus:ring-blue-500 focus:border-blue-500'`}
                                />
                            </FormField>
                        </div>

                        {/* 푸터 */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <SubmitButton type="submit" disabled={!isFormValid}>
                                문의 제출
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryPage;
