import { useState, type SubmitEvent } from 'react';
import { useLayoutStore } from '../store/layoutStore';
import useInquiryForm from '../hook/useInquiryForm';

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
            <div className="flex items-center justify-center min-h-full">
                <div className="max-w-2xl w-full mx-auto text-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
                        <h2 className="text-2xl font-bold text-green-800 mb-3">
                            문의가 접수되었습니다
                        </h2>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleBackToDashboard}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            대시보드로 돌아가기
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            다른 문의 접수하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-full">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">문의하기</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 성함 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            <span className="text-red-500">*</span> 성함
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.name
                                    ? 'border-gray-300'
                                    : errors.name
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            <span className="text-red-500">*</span> 이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.email
                                    ? 'border-gray-300'
                                    : errors.email
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </div>

                    {/* 회사 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">회사</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.company
                                    ? 'border-gray-300'
                                    : errors.company
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.company && (
                                <p className="text-red-500 text-sm">{errors.company}</p>
                            )}
                        </div>
                    </div>

                    {/* 내용 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            <span className="text-red-500">*</span> 내용
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={6}
                            className={`w-full px-3 py-2 border rounded resize-y ${
                                !formData.content
                                    ? 'border-gray-300'
                                    : errors.content
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.content && (
                                <p className="text-red-500 text-sm">{errors.content}</p>
                            )}
                        </div>
                    </div>

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InquiryPage;
