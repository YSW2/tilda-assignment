import { useLayoutStore, type MenuItem } from '../../store/layoutStore';

const Sidebar = () => {
    const { currentMenu, setMenu } = useLayoutStore();

    const menuItems: { id: MenuItem; label: string }[] = [
        { id: 'home', label: '대시보드 홈' },
        { id: 'settings', label: '설정' },
        { id: 'inquiry', label: '문의' },
    ];

    return (
        <aside className="w-60 shrink-0 bg-white border-r border-gray-200 py-6 overflow-y-auto">
            <nav>
                <ul className="list-none p-0 m-0">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setMenu(item.id)}
                                className={`
                                    w-full text-left px-6 py-3 border-none cursor-pointer transition-all duration-200 text-[15px]
                                    ${
                                        currentMenu === item.id
                                            ? 'bg-blue-50 text-blue-600 font-semibold border-l-[3px] border-l-blue-600'
                                            : 'bg-transparent text-gray-700 font-normal border-l-[3px] border-l-transparent hover:bg-gray-100'
                                    }
                                `}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
