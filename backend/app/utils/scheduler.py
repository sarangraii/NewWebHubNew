# from apscheduler.schedulers.asyncio import AsyncIOScheduler
# from app.services.news_fetcher import news_fetcher

# scheduler = AsyncIOScheduler()

# async def scheduled_news_fetch():
#     """Scheduled task to fetch news"""
#     print("Running scheduled news fetch...")
#     await news_fetcher.fetch_and_store_all_categories()
#     await news_fetcher.cleanup_old_articles()

# def start_scheduler():
#     """Start the background scheduler"""
#     # Fetch news every 6 hours
#     scheduler.add_job(scheduled_news_fetch, 'interval', hours=6, id='fetch_news')
    
#     # Cleanup old articles daily
#     scheduler.add_job(news_fetcher.cleanup_old_articles, 'interval', days=1, id='cleanup_articles')
    
#     scheduler.start()
#     print("Scheduler started")

# def stop_scheduler():
#     """Stop the scheduler"""
#     scheduler.shutdown()
#     print("Scheduler stopped")




from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.services.news_fetcher import news_fetcher
import asyncio

# ✅ Single scheduler instance
scheduler = AsyncIOScheduler(
    job_defaults={
        "coalesce": True,       # merge missed jobs
        "max_instances": 1      # prevent overlap
    }
)

async def scheduled_news_fetch():
    """Fetch news safely"""
    try:
        print("🕒 Scheduled news fetch started")
        await news_fetcher.fetch_and_store_all_categories()
        await news_fetcher.cleanup_old_articles()
        print("✅ Scheduled news fetch completed")
    except Exception as e:
        print(f"❌ Scheduler error: {e}")

def start_scheduler():
    """Start background scheduler safely"""

    if scheduler.running:
        print("⚠️ Scheduler already running")
        return

    # ❌ IMPORTANT: Remove old jobs (Render redeploy fix)
    scheduler.remove_all_jobs()

    # ✅ Fetch news every 12 hours (SAFE for free NewsAPI)
    scheduler.add_job(
        scheduled_news_fetch,
        trigger=IntervalTrigger(hours=12),
        id="fetch_news",
        replace_existing=True
    )

    # ✅ Cleanup once per day
    scheduler.add_job(
        news_fetcher.cleanup_old_articles,
        trigger=IntervalTrigger(days=1),
        id="cleanup_articles",
        replace_existing=True
    )

    scheduler.start()
    print("🚀 Scheduler started")

def stop_scheduler():
    """Shutdown scheduler gracefully"""
    if scheduler.running:
        scheduler.shutdown(wait=False)
        print("🛑 Scheduler stopped")
