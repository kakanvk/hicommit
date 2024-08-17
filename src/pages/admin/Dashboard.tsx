
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AppWindow, BookUp, GitCommitHorizontal, ListTodo, Rss, Users, TrendingUp } from "lucide-react";

import { Area, AreaChart, XAxis, YAxis } from "recharts"
import { Label, Pie, PieChart } from "recharts"
import { Bar, BarChart, CartesianGrid } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import NumberTicker from "@/components/magicui/number-ticker";

import { Link } from "react-router-dom";
import { useMemo } from "react";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const barChartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const barChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

function Dashboard() {

    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <div className="Dashboard p-5 pl-2 flex flex-col gap-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="">Quản trị</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        Tổng quan hệ thống
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <div className="flex flex-col gap-5">
                    <div className="bg-secondary/20 w-full rounded-xl pt-4 p-6 flex flex-col gap-6 border">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-xl font-bold">Tổng quan hệ thống</h1>
                                <p className="text-sm opacity-60 italic dark:font-light">* Dữ liệu chỉ mang tính tương đối</p>
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[220px] bg-transparent rounded-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toàn bộ thời gian</SelectItem>
                                    <SelectItem value="30day">Trong 30 ngày qua</SelectItem>
                                    <SelectItem value="7day">Trong 7 ngày qua</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-5 *:bg-secondary/60 *:dark:bg-secondary/40 *:flex-1 *:rounded-lg *:py-4 *:pt-3 *:p-5 *:border">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="font-bold text-2xl 2xl:text-3xl text-primary">
                                        <NumberTicker value={234} />
                                    </h2>
                                    <p className="opacity-60 text-sm 2xl:text-base">Người dùng</p>
                                </div>
                                <Users className="translate-y-1 opacity-40" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="font-bold text-2xl 2xl:text-3xl text-primary">
                                        <NumberTicker value={2354} />
                                    </h2>
                                    <p className="opacity-60 text-sm 2xl:text-base">Bài tập được tạo</p>
                                </div>
                                <AppWindow className="translate-y-1 opacity-40" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="font-bold text-2xl 2xl:text-3xl text-primary">
                                        <NumberTicker value={23534} />
                                    </h2>
                                    <p className="opacity-60 text-sm 2xl:text-base">Lượt nộp bài</p>
                                </div>
                                <BookUp className="translate-y-1 opacity-40" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="font-bold text-2xl 2xl:text-3xl text-primary">
                                        <NumberTicker value={78} />
                                    </h2>
                                    <p className="opacity-60 text-sm 2xl:text-base">Bài viết</p>
                                </div>
                                <ListTodo className="translate-y-1 opacity-40" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <Card className="bg-secondary/20 rounded-xl flex flex-col flex-[1.5]">
                            <CardHeader className="space-y-0 pb-0">
                                <CardDescription>Time in Bed</CardDescription>
                                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                    8
                                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">hr</span>
                                    35
                                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">min</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-1">
                                <ChartContainer config={{ time: { label: "Time", color: "hsl(var(--chart-2))" } }} className="h-full w-full">
                                    <AreaChart
                                        accessibilityLayer
                                        data={[
                                            { date: "2024-01-01", time: 8.5 },
                                            { date: "2024-01-02", time: 7.2 },
                                            { date: "2024-01-03", time: 8.1 },
                                            { date: "2024-01-04", time: 6.2 },
                                            { date: "2024-01-05", time: 5.2 },
                                            { date: "2024-01-06", time: 8.1 },
                                            { date: "2024-01-07", time: 7 },
                                        ]}
                                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    >
                                        <XAxis dataKey="date" hide />
                                        <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                                        <defs>
                                            <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-time)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--color-time)" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <Area dataKey="time" type="natural" fill="url(#fillTime)" fillOpacity={0.4} stroke="var(--color-time)" />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                            formatter={(value) => (
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    Time in bed
                                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                        {value}
                                                        <span className="font-normal text-muted-foreground">hr</span>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col gap-2 bg-secondary/20 rounded-xl flex-[1.2] 2xl:flex-[1.1]">
                            <CardHeader className="items-center pb-0">
                                <CardTitle className="text-xl">Thống kê lượt nộp bài</CardTitle>
                                <CardDescription>Trong toàn bộ thời gian</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0 w-full">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto h-full w-full"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            data={chartData}
                                            dataKey="visitors"
                                            nameKey="browser"
                                            innerRadius={'60%'}
                                            strokeWidth={5}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                                className="-translate-y-1 flex"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 0}
                                                                    className="fill-foreground text-3xl 2xl:text-5xl font-bold"
                                                                >
                                                                    {totalVisitors.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 25}
                                                                    className="fill-muted-foreground text-xs 2xl:text-sm"
                                                                >
                                                                    Hoàn thành
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                {/* <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div> */}
                                <div className="leading-none text-muted-foreground italic ">
                                    * Dữ liệu chỉ mang tính tương đối
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2 bg-secondary/20 rounded-xl flex-[1.2] 2xl:flex-[1.1]">
                            <CardHeader className="items-center">
                                <CardTitle className="text-xl">Thống kê lượt nộp bài</CardTitle>
                                <CardDescription>Trong toàn bộ thời gian</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 w-full">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <BarChart
                                        accessibilityLayer
                                        data={chartData}
                                        layout="vertical"
                                        margin={{
                                            left: 5,
                                        }}
                                    >
                                        <YAxis
                                            dataKey="browser"
                                            type="category"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) =>
                                                chartConfig[value as keyof typeof chartConfig]?.label
                                            }
                                        />
                                        <XAxis dataKey="visitors" type="number" hide />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Bar dataKey="visitors" layout="vertical" radius={5} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                {/* <div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div> */}
                                <div className="leading-none text-muted-foreground italic">
                                    * Dữ liệu chỉ mang tính tương đối
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;